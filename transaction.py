import os
from dotenv import load_dotenv
from ethtx import EthTx, EthTxConfig
from ethtx.models.decoded_model import DecodedTransaction
from ethtx.models.w3_model import W3Transaction, W3Block, W3Receipt, W3CallTree
from ethtx.models.decoded_model import (
    # DecodedTransfer,
    # DecodedBalance,
    # DecodedEvent, 
    DecodedCall,
)
from ethtx.models.objects_model import Transaction, Event, Block, Call
from flask import Flask, render_template
from flask import request

load_dotenv()

mongo_user = os.getenv('MONGO_USER_ID')
mongo_password = os.getenv('MONGO_USER_PASSWORD')
etherscan = os.getenv('ETHERSCAN_KEY')
quickNode = os.getenv('QUICK_NODE_KEY')

app = Flask(__name__)


@app.route('/tx/')
def index():
    return render_template('index.html')

@app.route('/tx/<txHash>', methods = ['GET', 'POST', 'DELETE'])
def user(txHash):
    if request.method == 'GET':
        """return the information for <user_id>"""
            
        ethtx_config = EthTxConfig(
            mongo_connection_string="mongodb://"+mongo_user+":"+mongo_password+"@144.76.234.79:27017/ethtx?authSource=admin",  ##MongoDB connection string,
            etherscan_api_key=etherscan,  ##Etherscan API key,
            web3nodes={
                "mainnet": {
                    "hook": "https://polished-skilled-emerald.discover.quiknode.pro/"+quickNode,  # multiple nodes supported, separate them with comma
                    "poa": False  # represented by bool value
                }
            },
            default_chain="mainnet",
            etherscan_urls={"mainnet": "https://api.etherscan.io/api", },
        )

        ethtx = EthTx.initialize(ethtx_config)
        # decoded_transaction: DecodedTransaction = ethtx.decoders.decode_transaction(
        #     '0x50051e0a6f216ab9484c2080001c7e12d5138250acee1f4b7c725b8fb6bb922d')
        # print(f'{decoded_transaction}')


        web3provider = ethtx.providers.web3provider


        # read raw transaction data directly from the node
        w3transaction: W3Transaction = web3provider.get_transaction(
            # '0x50051e0a6f216ab9484c2080001c7e12d5138250acee1f4b7c725b8fb6bb922d')
            # '0x0be782c5f470ea84b8378b66beb984e73c515a86d0b50be7445657c85e74eeb3')
            txHash)
        w3block: W3Block = web3provider.get_block(w3transaction.blockNumber)
        w3receipt: W3Receipt = web3provider.get_receipt(w3transaction.hash.hex())
        w3calls: W3CallTree = web3provider.get_calls(w3transaction.hash.hex())


        # read the raw transaction from the node
        transaction = Transaction.from_raw(
            w3transaction=w3transaction, w3receipt=w3receipt, w3calltree=w3calls
        )


        type_call = transaction.root_call.call_type
        print(type_call)

        # get proxies used in the transaction
        proxies = ethtx.decoders.get_proxies(transaction.root_call, "mainnet")

        block: Block = Block.from_raw(
            w3block=web3provider.get_block(transaction.metadata.block_number),
            chain_id="mainnet",
        )

        # decode a single call
        raw_call: Call = transaction.root_call
        abi_decoded_calls: DecodedCall = ethtx.decoders.abi_decoder.decode_call(
            raw_call, block.metadata, transaction.metadata, proxies
        )
        # decode transaction components
        # abi_decoded_events: List[Event] = ethtx.decoders.abi_decoder.decode_events(
        #     transaction.events, block.metadata, transaction.metadata
        # )

        # abi_decoded_transfers: List[
        #     DecodedTransfer
        # ] = ethtx.decoders.abi_decoder.decode_transfers(abi_decoded_calls, abi_decoded_events)
        # abi_decoded_balances: List[DecodedBalance] = ethtx.decoders.abi_decoder.decode_balances(
        #     abi_decoded_transfers
        # )

        # print(len(abi_decoded_transfers))

        # balances0 = abi_decoded_balances[0]
        # balances1 = abi_decoded_balances[1]
        # balances2 = abi_decoded_balances[2]
        # balances3 = abi_decoded_balances[3]
        # balances4 = abi_decoded_balances[4]
        # balances5 = abi_decoded_balances[5]
        # print(balances0)
        # print(balances1)
        # print(balances2)
        # print(balances3)
        # print(balances4)
        # print(balances5)
        # print(len(abi_decoded_balances))
        list1 = [] 
        from_name1 = abi_decoded_calls.from_address.name
        to_name1 = abi_decoded_calls.to_address.name
        print(f'1 from :{from_name1}')
        print(f'1 to :{to_name1}')
        list1.append({"id":1,"address":from_name1})
        list1.append({"id":1, "address":to_name1})
        length1 = len(abi_decoded_calls.subcalls)
        if length1 > 0 :
            for x in abi_decoded_calls.subcalls:
                length2 = len(x.subcalls)
                to_name2 = x.to_address.name
                print(f'2 to {to_name2}')
                list1.append({"id":2,"address":to_name2})  
                if length2 > 0 :
                    for y in x.subcalls:
                        length3 = len(y.subcalls)
                        to_name3 = y.to_address.name
                        print(f'3 to {to_name3}')
                        list1.append({"id":3,"address":to_name3})  
                        if length3 > 0:
                            for a in y.subcalls:
                                length4 = len(a.subcalls)
                                to_name4 = a.to_address.name
                                print(f'4 to {to_name4}')
                                list1.append({"id":4,"address":to_name4})  
                                if length4 > 0:
                                    for b in a.subcalls:
                                        # length5 = len(b.subcalls)
                                        to_name5 = b.to_address.name
                                        print(f'5 to {to_name5}')
                                        list1.append({"id":5,"address":to_name5})  
        print(txHash)
        return list1

