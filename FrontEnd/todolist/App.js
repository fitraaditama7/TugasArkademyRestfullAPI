import React, { Component } from 'react';
import { TextInput, Text, FlatList, View, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { Button, FormLabel, FormInput, } from 'react-native-elements';
import { ListItem } from 'native-base';

export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      todo: [],
      text: '',
      btnText: 'Simpan',
      base_url: 'http://192.168.0.37:3000/todo'
    }
  }

  handleGetData() {
    axios.get(this.state.base_url + '/')
      .then(res => {
        const todo = res.data;
        this.setState({ todo })
      })
  }

  handleUpdateData(id, title) {

    this.setState({ text: title, btnText: 'Update', id: id });
    // axios.put(this.base_url + '/' + id, { title: this.state.text })
    //   .then(res => {
    //     console.log(res);
    //     console.log('Berhasil Diupdate');
    //     this.handleGetData();

    //   })
  }

  handleInputData() {

    if (this.state.btnText === 'Simpan') {
      axios.post(this.state.base_url + '/', { title: this.state.text })
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.handleGetData();
          this.setState({ text: '' })
        })
    } else {
      axios.put(this.state.base_url + '/' + this.state.id, { title: this.state.text })
        .then(res => {
          console.log(res);
          this.handleGetData();
          this.setState({ text: '', btnText: 'Simpan' });
        })
    }
  }

  handleDeleteData(id) {
    axios.delete(this.state.base_url+'/'+id)
    .then(res => {
      this.handleGetData();
      this.setState({ text: '', btnText: 'Simpan' });
    })
  }

  componentDidMount() {
    this.handleGetData()
  }

  render() {
    return (
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput
          placeholder='Enter the Title'
          onChangeText={(text) => this.setState({ text })} value={this.state.text}
        />
        <Button
          title={this.state.btnText}
          backgroundColor='#303A52'
          style={{ height: 40 }}
          onPress={() => this.handleInputData()}
        />
        <FlatList
          data={this.state.todo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ListItem backgroundColor='black'>
              <TouchableHighlight
                onLongPress={() => this.handleDeleteData(item._id)}  
                onPress={() => this.handleUpdateData(item._id, item.title)}>
                <Text>{item.title}</Text>
              </TouchableHighlight>
            </ListItem>
          )}
        />
      </View>
    )
  }
}