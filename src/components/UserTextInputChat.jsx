
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from "twrnc"

const UserTextInputChat = ({ placeholder, domainType=false, isPass, setStateValue }) => {
  const [value, setValue] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#9c1d21');
  const [primaryValue, setPrimaryValue] = useState('#000000');
  const [primaryPlaceholder, setPrimaryPlaceholder] = useState('#404040');

  const handleTextChange = (text) => {
    setValue(text);
    setStateValue(text);
  };
  const handleBlur = () => {
    setPrimaryColor('#7a7a7a');
    setPrimaryPlaceholder('#9c1d21')
  };
  const handleInput = () => {
    setPrimaryColor('#4bb965');
    setPrimaryPlaceholder('#4bb965');
  };

  return (
    <View style={tw`border-b-[0.5px] rounded-1 px-1 pt-3 h-[55px] flex-row items-center content-center justify-between border-[${primaryColor}] ${domainType ? 'w-73%' : ''}`}>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={tw`flex-1 text-[15.5px] text-[${primaryValue}]`}
        placeholderTextColor={primaryPlaceholder}
        onChangeText={handleTextChange} 
        secureTextEntry={isPass && showPass}
        autoCapitalize='none'
        onBlur={handleBlur}
        onFocus={handleInput}/>
      {isPass &&
        <TouchableOpacity onPress={()=>setShowPass(!showPass)}>
          <Ionicons name={`${!showPass ? 'eye' : 'eye-off'}`} size={25} color={primaryColor} />
        </TouchableOpacity>
      }
    </View>
  );
  
}

export default UserTextInputChat
