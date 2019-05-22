import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';
import dialogAvatarType from './type';

// const onChangeText = (text) => {
//   if (text) {
//     console.log('not empty');
//     return false;
//   }
//   console.log('empty');
//   return true;
// };

/**
 * - Return a dialog box Component with TextInput
 * @param {{ dialogVisible:boolean, onPress:function,disabled:boolean,onChangeText:function }}
 * - Show/hide the dialogbox
 * - function to call when the button is clicked
 * @return {Component}
 */
const DialogAvatar = ({ dialogVisible, onPress, disabled, onChangeText }) => (
  <View>
    <Dialog.Container visible={dialogVisible}>
      <Dialog.Title>Register Tracker</Dialog.Title>
      <Dialog.Description>
        Please provide an avatar name for the registered tracker.
      </Dialog.Description>
      <Dialog.Input
        placeholder="avatar.."
        onChangeText={(text) => onChangeText(text)}
      />
      <Dialog.Button disabled={disabled} label="Ok" onPress={onPress} />
    </Dialog.Container>
  </View>
);

DialogAvatar.propTypes = dialogAvatarType.isRequired;

export default DialogAvatar;
