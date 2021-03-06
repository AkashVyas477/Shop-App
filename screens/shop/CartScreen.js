import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector , useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../component/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';
import Card from '../../component/UI/Card';


const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.Cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.Cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.Cart.items[key].productTitle,
        productPrice: state.Cart.items[key].productPrice,
        quantity: state.Cart.items[key].quantity,
        sum: state.Cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a,b)=>a.productId > b.productId ? 1 : -1);
  });

  const dispatch =useDispatch();

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress ={()=>{
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch( cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />

    </View>
  );
};

CartScreen.navigationOptions ={
  headerTitle:'Your Cart'
}; 


const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    
  },
  summaryText: {
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
