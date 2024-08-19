
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from "twrnc"

const UserTextInputChat = ({ placeholder, domainType=false, isPass, setStateValue, typeInput='default' }) => {
  const [value, setValue] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#9c9c9c');
  const [primaryValue, setPrimaryValue] = useState('#000000');
  const [primaryPlaceholder, setPrimaryPlaceholder] = useState('#9c9c9c');

  const handleTextChange = (text) => {
    setValue(text);
    setStateValue(text);
  };
  const handleBlur = () => {
    setPrimaryColor('#9c9c9c');
    setPrimaryPlaceholder('#9c9c9c')
  };
  const handleInput = () => {
    setPrimaryColor('#9c9c9c');
    setPrimaryPlaceholder('#9c9c9c');
  };

  return (
    <View style={tw`border-b-[0.5px] rounded-1 px-1 pt-3 mt-3 h-[55px] flex-row items-center content-center justify-between border-[${primaryColor}] ${domainType ? 'w-73%' : ''}`}>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={tw`flex-1 text-[12px] text-[${primaryValue}]`}
        placeholderTextColor={primaryPlaceholder}
        onChangeText={handleTextChange} 
        secureTextEntry={isPass && showPass}
        autoCapitalize='none'
        keyboardType={typeInput}/>
      {isPass &&
        <TouchableOpacity onPress={()=>setShowPass(!showPass)}>
          <Ionicons name={`${!showPass ? 'eye' : 'eye-off'}`} size={25} color={primaryColor} />
        </TouchableOpacity>
      }
    </View>
  );
  
}

export default UserTextInputChat
