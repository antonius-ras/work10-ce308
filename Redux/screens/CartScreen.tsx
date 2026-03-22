import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addItem, removeItem, clearCart, CartItem } from '../redux/cartSlice';

const CartScreen = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddItem = () => {
    if (!name || !quantity || !price) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    const newItem: CartItem = {
      id: Date.now().toString(), 
      name: name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };

    dispatch(addItem(newItem));
    
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ระบบตะกร้าสินค้า</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="ชื่อสินค้า" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="จำนวน" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="ราคา" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <Button title="เพิ่มลงตะกร้า" onPress={handleAddItem} />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>จำนวน: {item.quantity} | ราคา/ชิ้น: ฿{item.price}</Text>
            </View>
            <Button title="ลบ" color="red" onPress={() => dispatch(removeItem(item.id))} />
          </View>
        )}
      />
      
      <View style={styles.summaryContainer}>
        <Text style={styles.totalText}>ยอดรวม: ฿{totalAmount.toFixed(2)}</Text>
        <Button title="ล้างตะกร้า" color="orange" onPress={() => dispatch(clearCart())} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 20, gap: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  summaryContainer: { marginTop: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 8, gap: 10 },
  totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
});

export default CartScreen;