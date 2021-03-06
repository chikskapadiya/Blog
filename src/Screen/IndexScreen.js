import React, { useContext ,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button ,TouchableOpacity} from 'react-native';
import { Context } from '../Context/BlogContext';
import { Feather } from '@expo/vector-icons';


const IndexScreen = ({navigation}) => {
  const { state,deleteBlogPost,getBlogPosts } = useContext(Context);
 
   useEffect( ()=>{
    getBlogPosts();

    const   listener= navigation.addListener('didFocus',() => {
      getBlogPosts();
    });
    return ()=>{
      listener.remove();
    }
   },[]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={()=>navigation.navigate('CreateScreen')}>
          <Feather name='plus'  size={30} style={{marginRight:10}}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={blogPost => blogPost.title}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={()=>navigation.navigate('ShowScreen',{id:item.id})}>
                <View style={styles.row}>
                <Text style={styles.title}>{item.title} - {item.id}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                    <Feather name="trash"  size={24} />
                </TouchableOpacity>
               </View>
          </TouchableOpacity>
          
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
       marginHorizontal:15,
       paddingVertical: 20,
       borderTopWidth:1,
       borderBottomWidth:1,
       borderBottomColor: '#ac5353',
    },
    title:{
        fontSize:18,
    },
});

export default IndexScreen;