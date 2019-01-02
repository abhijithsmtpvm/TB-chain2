import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createHash } from 'crypto-browserify';
import { CryptoFactory, createContext } from "sawtooth-sdk/signing";
import * as protobuf  from "sawtooth-sdk/protobuf";
import { TextEncoder, TextDecoder} from "text-encoding/lib/encoding";
import { Buffer } from 'buffer/';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { InvalidTransaction } from 'sawtooth-sdk/processor/exceptions';
import { _setEntry } from '../../../tbdots_processor/TbDotsHandler';
import { Profile } from '../app/home/home.component';
import { Pcon } from '../app/home/home.component';
//import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class SawtoothService {
  public TB_FAMILY      = 'tbdots';
  public TB_MEDICINE = '000001MEDICINE';
  public TB_USER       = '000111USER';
  public TB_PATIENT     = '000333PATIENT';
  public TB_INTAKE        = '000555INTAKE';
  public TB_PASSPHARSE  = 'This is my dummy passpharse for batcher key pair'
  private currUser: string ="";
  private finalAadharAray: any;
  private idx:number = 0; 
  private batchSigner: any;
  public  batchPublicKey: any;
  private batchPrivateKey: any;

  private txnSigner: any;
  public  txnPublicKey: any;
  private txnPrivateKey: any;
  public padd: any;

  
  public srcAddress: any;
  public destAddress:string = "";
  public transactionHeaderBytes: any;
  private context: any; 
  
  //private FAMILY_NAME = 'tbdots'; // tbdots
  private FAMILY_VERSION = '1.0';
  private REST_API_BASE_URL = 'http://localhost:4200/api';
 
  public hash = (x) => createHash('sha512').update(x,'utf-8').digest('hex');
  private _returnVBAddress = (type,input) => { type + this.hash(input) }

  public addUser(key,value){

    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,7) + this.hash("M").substr(0,1) + this.hash(key).substr(0, 56);
    this.sendData('addmmanufacture', value);
  }
  //ABHIJITH FOR VERIFY.COMPONENT
 
 
  

  public addPatient(key,value,mobNum){
    console.log("This is the mobNumber coming here from verify", mobNum)

    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,7) + this.hash(key).substr(0, 57);
    console.log("This is the mobNumber coming here from verify bottom", mobNum)
    console.log("This is the srcaddress to sendata", this.srcAddress )
    this.sendData('AddPatient', value);
  }


//ABHIJITH FOR PATIENT.COMPONENT
  public addVaccine(key,value){
    console.log('in add vaccine : '+value);
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 7) + this.hash(key.substr(0, 2) ).substr(0, 7) + this.hash(key.substr(3, 5) ).substr(0, 7) + this.hash(key.substr(6, 9) ).substr(0, 7) + this.hash(this.TB_MEDICINE).substr(0, 42) ;
    this.sendData('addmmedicine', value);
    console.log("value here is"+value)
    console.log("adress of vacc is  ", this.srcAddress)
  }
 
  public addressing2(mobNum,value){
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,7) + this.hash(mobNum).substr(0, 57)
    var history =this.getState(this.srcAddress);
    const addre =this.srcAddress;
    console.log("adress is here" , history)

  }

  public veriVaccine(key,value,mobNum){
    console.log('in add vaccine : '+value);
    console.log ('hhhhh, '+value)
    
    //this.srcAddress = this.hash(this.VB_FAMILY).substr(0, 6) + this.hash(this.TB_MEDICINE).substr(0,64);
    
    //this.srcAddress = this.hash(this.VB_FAMILY).substr(0, 7) + this.hash(key.substr(0, 2) ).substr(0, 7) + ;
    this.padd = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,7) + this.hash(mobNum).substr(0, 57)
    var pro1 =this.getState(this.padd)
    console.log("pro1 contains this",pro1)
    pro1.then((String) => {
      console.log ("you are here")
      this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 7) + this.hash(key.substr(0, 2) ).substr(0, 7) + this.hash(key.substr(3, 5) ).substr(0, 7) + this.hash(key.substr(6, 9) ).substr(0, 7) + this.hash(this.TB_MEDICINE).substr(0, 42) ;
      var pro =this.getState(this.srcAddress);
      console.log ("you are here 111111")
      console.log ("you are here 222222", mobNum)
      pro.then((String) => {
        console.log (String )
        const reche = JSON.parse(String);
        let entMedid = reche["medid"]
        console.log(entMedid);
        const reche1 = JSON.parse(String)
        let entMedid1 = reche1["Status"]
        console.log("This is in reche 1 expected active", entMedid1);
        let medid1 = reche1["medid"];
        let name1 = reche1["Name"] ;
        let combination1 = reche1["combination"];
        let createdby1 = reche1["CreatedBy"];
        let timestamp1 =reche1["TimeStamp"] ;
        
        if (entMedid === key)
        {
          console.log("This is in reche 1 expected active inner if", entMedid1);
          if (entMedid1 === "Active"){
            console.log("This is in reche 1 expected active inner if IF", entMedid1);
            console.log("medicine verified")
            var newProfile = <Profile>{};
            newProfile.medid = medid1;
            newProfile.Name = name1;
            newProfile.combination = combination1;
            newProfile.CreatedBy = createdby1;
            newProfile.Status = "Deactive";
            newProfile.TimeStamp = timestamp1;
            let value1 = newProfile;
            this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 7) + this.hash(key.substr(0, 2) ).substr(0, 7) + this.hash(key.substr(3, 5) ).substr(0, 7) + this.hash(key.substr(6, 9) ).substr(0, 7) + this.hash(this.TB_MEDICINE).substr(0, 42) ;
            this.sendData('updateMed', value1);
            console.log("medicine verified 2222222222222")
            console.log ("you are here 4444444", mobNum)
            var patientconf =<Pcon>{};
            patientconf.medid =  medid1;
            patientconf.TimeStamp = new Date().toString();
            let value2 = patientconf;
            console.log("controll is here 3331212 upper", value2);
            this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,7) + this.hash(mobNum).substr(0, 57)
            this.sendData('updateIntake', value2);
            console.log("controll is here 3331212 lower", value2);
          }
          else{console.log("medicine not varified")}
        }
      });
      
      });
    
    
   
    
    console.log("in addVaccine" )
    
    
  }



  

  public getUser(value){
    this.sendData('GetUser', value);
  }

  public getVaccine(key,value){
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,7) + this.hash("T").substr(0,1) + this.hash(key.toString()).substr(0, 56);
    this.sendData('GetVaccine', value);
  }

  public getAadhar(value){
    this.sendData('GetAadhar', value);
  }

  private updateAadharArray(value)
  {
    this.finalAadharAray.push(value);
  }

  private retupdateAadharArraySize(){
    return this.finalAadharAray.length
  }

  private retrivalOver(){
    
    
  }

  
  public retPincode(value){
    this.finalAadharAray = new Array();
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_PATIENT).substr(0,7) +this.hash(value).substr(0, 57);
    var retPromise = this.getState(this.srcAddress);
    retPromise.then((String) => {
      
      //finalAadharAray.push(String);
      //this.updateArray(String);
      //console.log("=====1"+ this.finalAadharAray[0])
      
          let tempArray = String.split("|");
          this.idx = tempArray.length;
          console.log("====="+ this.idx)
      for ( let ctr=0;  ctr < tempArray.length ; ctr++) {
        this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_USER ).substr(0,7) +this.hash(tempArray[ctr]).substr(0, 57);
        let retArrayPromise = this.getState(this.srcAddress);
          retArrayPromise.then((String) => { this.idx--;this.updateAadharArray(String); if (this.idx <= 0) this.retrivalOver() })
          retArrayPromise.catch((err) => {throw err})

      }
      
    })
    retPromise.catch((err) => {throw err})
        
  }

  public retVac(key){
    // Get vacc
    // Get med details
    
    this.finalAadharAray = new Array();
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_MEDICINE).substr(0,64);
    let pro =this.getState(this.srcAddress);
         console.log(pro) }












  public setCurrentUser(value){
    this.currUser = value;
  }
  public retCurrentUser(){
    return this.currUser;
  }
  public retAadhar(key){
    // Get aadhar header record
    // Get aadhar vaccination detail record
    
    this.finalAadharAray = new Array();
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_USER ).substr(0,7) +this.hash(key.toString()).substr(0, 57);
    let pro =this.getState(this.srcAddress);
    pro.then((string) => {
       this.updateAadharArray(string);
       this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,7) + this.hash("T").substr(0,1) + this.hash(key.toString()).substr(0, 56)
      pro =this.getState(this.srcAddress);
      pro.then((string) => {
     //   console.log("''''2->" + string)
        this.updateAadharArray(string);
        this.retrivalOver();
      })
      pro.catch((error) => {
       console.error(error);
       this.retrivalOver();
      });
    pro.catch((error) => {
       this.retrivalOver();
        console.error(error);
      });
  })
}



  
  

  constructor(public http: HttpClient) { 
    
    this.context = createContext('secp256k1');
    let passPharse = this.hash(this.TB_PASSPHARSE).slice(0,64);
    this.batchPrivateKey = Secp256k1PrivateKey.fromHex(passPharse); 
    //this.batchPrivateKey = this.context.newRandomPrivateKey();
    this.batchSigner = new CryptoFactory(this.context).newSigner(this.batchPrivateKey);
    this.batchPublicKey = this.batchSigner.getPublicKey().asHex();
    console.log("Batch Priv ==>" + this.batchPublicKey);
    
  }

  public genKeyPair(keyData)
  {
  console.log(keyData);
  this.txnPrivateKey = Secp256k1PrivateKey.fromHex(keyData); 
  this.txnSigner =new  CryptoFactory(this.context).newSigner(this.txnPrivateKey);
  this.txnPublicKey = this.txnSigner.getPublicKey().asHex();
  console.log("Txn Priv ==>" + this.batchPublicKey);
  }
 //ABHIJITH
 /*public genKeyPair1(keyData)
  {
  console.log(keyData);
  this.txnPrivateKey = Secp256k1PrivateKey.fromHex(keyData); 
  this.txnSigner =new  CryptoFactory(this.context).newSigner(this.txnPrivateKey);
  this.txnPublicKey = this.txnSigner.getPublicKey().asHex();
  console.log("Txn Priv ==>" + this.batchPublicKey);
  }*/


/******************************************************************************************** */
private getTransaction(transactionHeaderBytes, payloadBytes): any {
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: this.txnSigner.sign(transactionHeaderBytes),
    payload: payloadBytes
  });

  return transaction;
}
/*-------------Creating transactions & batches--------------------*/
private getTransactionsList(payload): any {
  // Create transaction header
  
  const transactionHeader = this.getTransactionHeaderBytes([this.srcAddress], [this.srcAddress], payload);
  let transaction = this.getTransaction(transactionHeader, payload);
  let transactionsList = [transaction];
  return transactionsList;
}
/* Create batch list */
private getBatchList(transactionsList): any {
  // List of transaction signatures
  const transactionSignatureList = transactionsList.map((tx) => tx.headerSignature);
  // Create batch header
  const batchHeader = this.getBatchHeaderBytes(transactionSignatureList);
  // Create the batch
  const batch = this.getBatch(batchHeader, transactionsList);
  // Batch List
  const batchList = this.getBatchListBytes([batch]);
  return batchList;
}
/* Batch Header*/
private getBatchHeaderBytes(transactionSignaturesList): any {
  const batchHeader = protobuf.BatchHeader.encode({
    signerPublicKey: this.batchPublicKey,
    transactionIds: transactionSignaturesList
  }).finish();

  return batchHeader;
}
/* Get Batch */
private getBatch(batchHeaderBytes, transactionsList): any {
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: this.batchSigner.sign(batchHeaderBytes),
    transactions: transactionsList
  });

  return batch;
}
/* Encode the payload */
private getEncodedData(action, values): any {
  const data = action + "|" + values;
  return new TextEncoder('utf8').encode(data);
}

private getBatchListBytes(batchesList): any {
  const batchListBytes = protobuf.BatchList.encode({
    batches: batchesList
  }).finish();

  return batchListBytes;
}


public async sendData(action, values) {
  // Encode the payload
  var transactionsList = new Array();
  var payload;
  var batchList;

  if (values instanceof Array) {
     // this.destAddress = this.srcAddress;
      payload = this.getEncodedData(action[0], JSON.stringify(values[0]) );
      const tempArray = this.getTransactionsList(payload);
      console.log("this is the src address  in send data function",this.srcAddress)
      this.srcAddress = this.destAddress;
      console.log("this is the src address  in send data function bellow",this.srcAddress)
      payload = this.getEncodedData(action[1], JSON.stringify(values[1]) );
      const tempArray1 = this.getTransactionsList(payload);
      transactionsList = tempArray.concat(tempArray1);
    }
    else
    {
      //this.destAddress = this.srcAddress;
      payload = this.getEncodedData(action, JSON.stringify(values) );
      transactionsList = this.getTransactionsList(payload);
    }
    
    batchList = this.getBatchList(transactionsList);
  //debug
  
  // Send the batch to REST API
  await this.sendToRestAPI(batchList)
   .then((resp) => {
      console.log("response here1", resp);
      let respCode = resp["status"]
      if ( respCode != null ){
        if ( parseInt(respCode) > 300 )
        alert("Previous transaction was rejected with reason[" + resp["statusText"] + "]")
      }
      return resp;
    })
    .catch((error) => {
      console.log("error here", error);
    })
}

public async sendToRestAPI(batchListBytes): Promise<any> {
     
    return this.postBatchList(batchListBytes)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("response here.....", JSON.stringify(responseJson));
      if ( responseJson.data){console.log("data.....")}
      if ( responseJson.error){alert(responseJson.error.message )}
      if ( responseJson.link){console.log("link.....")}
      //var data = responseJson.data;
      //var value = new Buffer(data, 'base64').toString();
      //return value;
      return responseJson;
    })
    .catch((error) => {
      alert("Unexpected error while processing your transaction");
      throw new InvalidTransaction("Unexpectded Error");
    }); 	
  
  
}
  



//Get the state 
public async getState(address): Promise<any> {
   {
    const getStateURL = this.REST_API_BASE_URL + '/state/' + address;
    console.log("Getting from: " + getStateURL);
    return fetch(getStateURL, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var data = responseJson.data;
      var value = new Buffer(data, 'base64').toString();
      return value;
    })
    .catch((error) => {
      alert("Unexpected error while processing your transaction");
      throw new InvalidTransaction("Unexpectded Error");
    }); 	
  }
}
//send the tranaction
private postBatchList(batchListBytes): Promise<any> {
  
  const postBatchListURL = this.REST_API_BASE_URL + '/batches';
  const fetchOptions = {
    method: 'POST',
    body: batchListBytes,
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }
  return window.fetch(postBatchListURL, fetchOptions);
}  
private getTransactionHeaderBytes(inputAddressList, outputAddressList, payload): any {
  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: this.TB_FAMILY,
    familyVersion: this.FAMILY_VERSION,
    inputs: inputAddressList,
    outputs: outputAddressList,
    signerPublicKey: this.txnPublicKey,
    batcherPublicKey: this.batchPublicKey,
    dependencies: [],
    payloadSha512: this.hash(payload),
    nonce: (Math.random() * 1000).toString()
  }).finish();

  return transactionHeaderBytes;
}
private getDecodedData(responseJSON): string {
  const dataBytes = responseJSON.data;
  console.log(dataBytes)
  const decodedData = new Buffer(dataBytes, 'base64').toString();
  return decodedData;
}

    
}