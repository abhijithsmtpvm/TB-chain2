/**
 * Copyright 2018 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ------------------------------------------------------------------------------
 */

//works in strict mode
'use strict'

//require the handler module.
//declaring a constant variable.
const { TransactionHandler } = require('sawtooth-sdk/processor/handler')


const {
  InvalidTransaction,
  InternalError
} = require('sawtooth-sdk/processor/exceptions')

const crypto = require('crypto')
const {TextEncoder, TextDecoder} = require('text-encoding/lib/encoding')

const _hash = (x) => crypto.createHash('sha512').update(x).digest('hex').toLowerCase().substring(0, 64)
var encoder = new TextEncoder('utf8')
var decoder = new TextDecoder('utf8')
const MIN_VALUE = 0
const TB_FAMILY = 'tbdots'
const TB_NAMESPACE = _hash(TB_FAMILY).substring(0, 6)
const TB_VERSION = '1.0'

//function to display the errors
const _toInternalError = (err) => {
  console.log(" in error message block")
  let message = err.message ? err.message : err
  throw new InternalError(message)
}

//function to set the entries in the block using the "SetState" function
const _setEntry = (context, address, stateValue) => {
  let dataBytes = encoder.encode(stateValue)
  let entries = {
    [address]: dataBytes 
  }
  return context.setState(entries)
}

//function to add a name value
const addNameValue =(context, address, value, userPK)  => (possibleAddressValues) => {
  let stateValueRep = possibleAddressValues[address]

  console.log(" I am in addNameValue ==>" + address + "<==>" + value )
  if (stateValueRep == null || stateValueRep == ''){
    console.log("No previous name/value, creating a new name value pair ")
  }

  return _setEntry(context, address, value)
}

// function to update an existing 
const updateNameValue =(context, address, value, userPK)  => (possibleAddressValues) => {
  console.log(" I am in updateNameValue ==>" + address + "<==>" + value )
  let stateValueRep = possibleAddressValues[address]
  let oriValue = ''
  console.log("<==>"+ stateValueRep+ "<==>")
  if (stateValueRep == null || stateValueRep == ''){
    oriValue = value
    console.log("no matching for the given name value pair")
  }
  else{
    console.log("New value for name ==>" + stateValueRep)
    oriValue = decoder.decode(stateValueRep) + "|" + value
    console.log("New value for name ==>" + oriValue)
  }

  context.addEvent(
    "tbdots/tbdots-action",
    [["action", "Udate"],["actionText", "I am in update"], ["user", userPK]],
    Buffer.from("Current data: " + 'utf8')
  )
  return _setEntry(context, address, oriValue)
}


class TbDotsHandler extends TransactionHandler
{
  constructor()
  {
    super(TB_FAMILY,[TB_VERSION],[TB_NAMESPACE])
  }

  apply(transactionProcessRequest, context)
  {
	  
    let currPayLoad = transactionProcessRequest.payload.toString().split('|')
    let actionName = currPayLoad[0]
    let actionValue = currPayLoad[1]

    console.log("Payload is : " + actionName + " : " + actionValue )

    let header = transactionProcessRequest.header
    let userPublicKey = header.signerPublicKey
    if (!actionName) 
    {
      throw new InvalidTransaction('Action is required')
    }

    //check for payload data
    if (actionValue === null || actionValue === undefined) {
      throw new InvalidTransaction(' Action value is missing')
    }

    let functionName

    let addressFromValidator = transactionProcessRequest.header.inputs[0]

    if(actionName == 'addmmanufacture'|| actionName  == 'addmmedicine' || actionName == 'AddPatient' ){
      functionName = addNameValue
    }else if(actionName == 'takemedicine' || actionName == 'updateMed' || actionName == 'updateIntake' ){
      functionName = updateNameValue
    }else{
      throw new InvalidTransaction(`Invalid action`)	
    }

    console.log("Address from validator : " + addressFromValidator )
    
    //let Address = CJ_NAMESPACE + _hash(userPublicKey).slice(-64)
    let getPromise
    if(actionName == 'addmmanufacture'|| actionName  == 'addmmedicine' || actionName == 'AddPatient')
      getPromise = context.getState([addressFromValidator])
    else
      getPromise = context.getState([addressFromValidator])

    let actionPromise = getPromise.then(
        functionName(context, addressFromValidator, actionValue, userPublicKey)
      )
    
    return actionPromise.then(addresses => {
      if (addresses.length === 0) {
        throw new InternalError('State Error!')
      }  
    })
  }
}

module.exports = TbDotsHandler
