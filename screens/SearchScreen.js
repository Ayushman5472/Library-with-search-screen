import React from 'react';
import { Text, View, FlatList, ViewPagerAndroidBase} from 'react-native';
import db from '../config'

export default class Searchscreen extends React.Component {
  constructor(){ 
    super()
    this.state = {transactions:[], lastDoc:null}
   
  }
  fetchMoreDocs=async()=>{
  const query = await db.collection("Transactions").startAfter(this.state.lastDoc).limit(10).get()
  query.docs.map(loadDoc=>{
    this.setState({
      transactions:[...this.state.transactions, loadDoc.data()],
      lastDoc:loadDoc
    })
  })
  }
  componentDidMount=async()=>{
    const query = await db.collection("Transactions").limit(10).get()
    query.docs.map(doc=>{
      this.setState({
      transactions:[...this.state.transactions, doc.data()],
      lastDoc:doc
      }
      )
    })
  }

    render() {
      return (
      <FlatList data={this.state.transactions} 
      renderItem={({item})=>(<View style = {{borderBottomWidth:2,
      }}><Text>
        {"Book ID : "+item.BookID}
        </Text>
        <Text>
          {"Student ID : "+item.StudentID}
        </Text>
        <Text>
          {"Transaction Type : "+ item.TransactionType} 
        </Text>
        
        <Text>  
          {"Date : "+ item.Date}
        </Text>
        </View>)}
        onEndReached={this.fetchMoreDocs}
        onEndReachedThreshold={0.7}
      >

      </FlatList>
      )
    }
  }