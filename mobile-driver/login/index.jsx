import React, { Component } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

class LoginScreen extends Component {
  handleLogin = async (values, actions) => {
    try {
      const res = await axios.post('/login', {
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        Alert.alert('Success', 'Login successful');
        this.props.navigation.replace('RequestList');
      } else {
        Alert.alert('Failed', 'Invalid credentials');
      }
    } catch (err) {
      Alert.alert('Login Error', 'Invalid credentials');
      console.log(err.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_640.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Driver Login</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={this.handleLogin}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFDA43',
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  input: {
    width: '85%',
    borderWidth: 1,
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 28,
    alignSelf: 'flex-start',
    width: '90%',
  },
  button: {
    backgroundColor: '#007BFF',
    width: '85%',
    borderWidth: 0,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFDA43',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
