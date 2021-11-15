import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

const FeedbackScreen = ({navigation}) => {
  
  const [feedback, setFeedback] = useState("");
  
  const submit_feedback = () => {
    
    
    if(feedback.length === 0){
      alert("Please write something to submit...");
      return null;
    }
   
    alert("Please Wait While We Submitting Your Feedback...");

    fetch(`http://mycms-324318.appspot.com/labharthiapp_feedback`, {
      method: "POST",
      body: JSON.stringify({feedback}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        alert("Thankyou For Your Feedback!");
        setFeedback("");
        navigation.navigate("MainApp"); 
      })
      .catch(e => alert("Something Went Wrong! While Submitting Your Feedback!"));    
  }
  
  return (
    <>
      
      <Text style={{margin: 10}}>Write Your Feedback...</Text>
    
      <TextInput
        value={feedback}
        onChangeText={(v) => {
          setFeedback(v);
        }}
        multiline
        numberOfLines={10}
        style={{margin: 10, padding: 15, textAlignVertical: 'top', borderWidth: 1, borderColor: 'indigo', borderRadius: 3}}
        placeholder="Write Your Feedback Here..."
      />
      

      <TouchableOpacity onPress={submit_feedback}>
        <Text style={{margin: 10, borderRadius: 3, padding: 10, textAlign: 'center', backgroundColor: 'indigo', color: 'white'}}>Submit</Text>
      </TouchableOpacity>
      
    </>
  );
};

export default FeedbackScreen;