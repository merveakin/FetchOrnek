import React,{Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class App extends Component{

constructor(props){
super(props);

this.state={
  //burayı başlangıçta true yapıp componentDidMount içinde apiye gidip apiden sonuç alınca false yapmak istedim.
  isLoading:false,    //isLoading:false, yazarsak isimleri isLoading:true, dersek bekliyor/ yükleniyor diyecek...
  // başlangıçta burası dataSourcce: [] boş bir dizi componentDidMount içinde dolmalı. Şimdilik Manuel verdim görüntü alabiliyor muyum diye.
  data:[]
} // state burada biter

}// ctor burada biter

componentDidMount(){
  alert("componentDidMount çalıştı.")
  alert(this.state.isLoading)
  fetch('http://localhost:47152/api/gorev',
  {
   method: 'GET',
   headers: {
   "Accept": "application/json",
   'Content-Type': 'application/json'
  }
  })
  .then((response) => {
  return response.json();
  })
  .then(responseData => {return responseData;})
  .then(data => {
   this.setState({
    //isLoading:false,
    data:data   
  });
  }
  )
  .catch(function(err) {
    alert(err)
  })
  alert(this.state.isLoading)
} //componentDidMount burada biter


render(){
 
  if(this.state.isLoading){
    return(

      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }
  else{
  let people=this.state.data.map((value,key)=>{
return(
<View style={styles.item} key={key}>
<Text>{value.description}</Text>
</View>

) // return burada biter

  }) //let burada biter

  return(
<View style={styles.container}>
 {people}
</View>
  )} // else burada biter
}
} //export default class burada bitiyor

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    flex:1,
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center'
  }
});