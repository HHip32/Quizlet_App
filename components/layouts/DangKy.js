import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Octicons } from '@expo/vector-icons';

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

// format Date để thêm vào api
const formatDate = (date) => {
    return date ? format(date, 'dd-MM-yyyy') : ''; // Định dạng ngày tháng
};

export default function DangKy({ navigation, route }) {

    // Lay api
    const BASE_URL = 'https://zy8j3c-3000.csb.app/users'

    const [selectedDate, setSelectedDate] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isGV, setIsGV] = useState(true);

    const postUser = async () => {
        // Kiểm tra điều kiện cho từng trường
        if (!selectedDate) {

            Toast.show({
                type: 'error', // Loại thông báo: 'success', 'error', 'info'
                text1: 'Lỗi', // Tiêu đề
                text2: 'Vui lòng chọn ngày sinh', // Nội dung
                position: 'top',
                topOffset: 200,
            });
            return;
        }

        if (!email || !name || !password) {
            Toast.show({
                type: 'error', // Loại thông báo: 'success', 'error', 'info'
                text1: 'Lỗi', // Tiêu đề
                text2: 'Vui lòng nhập đủ thông tin', // Nội dung
                position: 'top',
                topOffset: 200,
            });
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show({
                type: 'error', // Loại thông báo: 'success', 'error', 'info'
                text1: 'Lỗi', // Tiêu đề
                text2: 'Định dạng email không hợp lệ', // Nội dung
                position: 'top',
                topOffset: 200,
            });
            return;
        }
        // Kiểm tra tên
        const nameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
        if (!nameRegex.test(name)) {
            Toast.show({
                type: 'error', // Loại thông báo: 'success', 'error', 'info'
                text1: 'Lỗi', // Tiêu đề
                text2: 'Tên phải bắt đầu bằng chữ cái', // Nội dung
                position: 'top',
                topOffset: 200,
            });
            return;
        }
        // Kiểm tra mật khẩu
        if (password.length < 8) {
            Toast.show({
                type: 'error', // Loại thông báo: 'success', 'error', 'info'
                text1: 'Lỗi', // Tiêu đề
                text2: 'Mật khẩu phải có ít nhất 8 kí tự', // Nội dung
                position: 'top',
                topOffset: 200,
            });
            return;
        }



        try {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dob: formatDate(selectedDate),
                    email: email,
                    name: name,
                    password: password,
                    isGV: isGV
                }),
            });
            Toast.show({
                type: 'success', // Loại thông báo: 'success', 'error', 'info'
                text1: 'Thông báo', // Tiêu đề
                text2: 'Đăng ký tài khoản thành công', // Nội dung
                position: 'top',
                topOffset: 200,
            });
            setSelectedDate(null);
            setEmail('');
            setName('');
            setPassword('');
            setIsGV(true);
        } catch (error) {
            Toast.show({
                type: 'error', // Loại thông báo: 'success', 'error', 'info'
                text1: 'Lỗi', // Tiêu đề
                text2: 'lỗi', // Nội dung
                position: 'top',
                topOffset: 200,
            });
        }
    };

    // config alert
    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'green' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 30, // Đặt kích thước chữ
                    fontWeight: '700', // Có thể thêm các thuộc tính kiểu khác tại đây
                    color: 'black'
                }}
                text2Style={{
                    fontSize: 15, // Đặt kích thước chữ
                    fontWeight: '500', // Có thể thêm các thuộc tính kiểu khác tại đây
                    color: 'green'
                }}
            />
        ),
        error: (props) => (
            <ErrorToast
                {...props}
                style={{ borderLeftColor: 'red' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 30, // Đặt kích thước chữ
                    fontWeight: '700',
                    color: 'black'
                }}
                text2Style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: 'red'
                }}
            />
        ),
    };
    // xu li dang ki
    const handleSignUp = async () => {
        await postUser();
    }

    // sự kiện chọn ngày của datepicker
    const handleChange = (date) => {
        setSelectedDate(date);
    };



    // handle checkbox

    const toggleCheckbox = (value) => {
        if (value !== isGV) {
            setIsGV(value);
        }
    }

    // custom datepicker
    const CustomInput = ({ value, onClick }) => (
        <TextInput
            style={{ width: 300, height: 30, borderColor: '#F0F0EF', color: 'white', fontSize: 24 }}
            placeholder="Chọn ngày sinh"
            value={value}
            onClick={onClick}
        />
    );

    return (
        <ScrollView style={styles.container}>



            <Text style={{ width: 228, height: 49, marginTop: 15, marginLeft: 20, color: '#FFFFFF', fontFamily: null, fontSize: 18, fontWeight: 400 }}>
                Đăng kí nhanh bằng
            </Text>
            <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', borderWidth: 1, borderColor: 'gray', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../imgs/facebook.png')}
                        style={{ width: 32, height: 32 }}
                    />
                </View>
                <Text
                    style={{ height: '100%', marginTop: 15, marginLeft: 20, color: '#FFFFFF', fontFamily: null, fontSize: 20, fontWeight: 500 }}

                >
                    Tiếp tục với Facebook
                </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', marginTop: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../imgs/google.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </View>
                <Text
                    style={{ height: '100%', marginTop: 10, marginLeft: 20, color: '#FFFFFF', fontFamily: null, fontSize: 20, fontWeight: 500 }}

                >
                    Tiếp tục với Google
                </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', marginTop: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../imgs/apple.png')}
                        style={{ width: 32, height: 32 }}
                    />
                </View>
                <Text
                    style={{ height: '100%', marginTop: 15, marginLeft: 10, color: '#FFFFFF', fontFamily: null, fontSize: 20, fontWeight: 500 }}

                >
                    Đăng nhập bằng Apple
                </Text>
            </View>
            <Text
                style={{ width: '90%', marginLeft: '5%', marginTop: 20, fontSize: 20, fontWeight: 500, color: '#FFFFFF' }}
            >
                hoặc tạo 1 tài khoản
            </Text>
            <View
                style={{ width: '90%', height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '5%', marginTop: 10, borderBottomWidth: 1, borderColor: '#F0F0EF', zIndex: 1 }}
            >
                <DatePicker
                    customInput={<CustomInput />}
                    placeholderText='Chọn ngày sinh'
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="dd-MM-yyyy"
                    isClearable
                />
                <Pressable
                    style={{ width: '10%', height: '100%', marginBottom: 15, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Octicons name="info" size={30} color="white" />
                </Pressable>
            </View>

            <Text
                style={{ width: '90%', marginLeft: '5%', marginTop: 2, fontSize: 14, fontWeight: 400, color: '#F0F0EF' }}
            >
                Ngày sinh
            </Text>
            <TextInput
                style={{ width: '90%', height: 40, marginLeft: '5%', marginTop: 10, borderBottomWidth: 1, borderColor: '#F0F0EF', fontSize: 24, color: 'white' }}
                placeholder='example@email.com'
                placeholderTextColor={'#F0F0EF'}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Text
                style={{ width: '90%', marginLeft: '5%', marginTop: 2, fontSize: 14, fontWeight: 400, color: '#F0F0EF' }}
            >
                Email
            </Text>
            <TextInput
                style={{ width: '90%', height: 40, marginLeft: '5%', marginTop: 10, borderBottomWidth: 1, borderColor: '#F0F0EF', fontSize: 24, color: 'white' }}
                placeholder='Tên người dùng'
                placeholderTextColor={'#F0F0EF'}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Text
                style={{ width: '90%', marginLeft: '5%', marginTop: 2, fontSize: 14, fontWeight: 400, color: '#F0F0EF' }}
            >
                Name
            </Text>
            <TextInput
                style={{ width: '90%', height: 40, marginLeft: '5%', marginTop: 10, borderBottomWidth: 1, borderColor: '#F0F0EF', fontSize: 24, color: 'white' }}
                placeholder='Tạo mật khẩu của bạn'
                placeholderTextColor={'#F0F0EF'}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Text
                style={{ width: '90%', marginLeft: '5%', marginTop: 2, fontSize: 14, fontWeight: 400, color: '#F0F0EF' }}
            >
                Mật khẩu
            </Text>

            <Text
                style={{ width: '90%', marginLeft: '4.5%', marginTop: 10, fontSize: 14, fontWeight: 500, color: '#F0F0EF' }}
            >
                Bạn là giáo viên?
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <CheckBox
                    checked={isGV}
                    onPress={() => toggleCheckbox(true)}
                    title={"Phải"}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                    containerStyle={{ backgroundColor: '#2F3856', borderWidth: 0 }}
                    titleProps={{ style: { color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginLeft: 10 } }}
                    checkedColor='#FFFFFF'
                    uncheckedColor='#FFFFFF'
                />
                <CheckBox
                    checked={!isGV}
                    onPress={() => toggleCheckbox(false)}
                    title={"Không"}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                    containerStyle={{ backgroundColor: '#2F3856', borderWidth: 0 }}
                    titleProps={{ style: { color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginLeft: 10 } }}
                    checkedColor='#FFFFFF'
                    uncheckedColor='#FFFFFF'
                />
            </View>
            <Text
                style={{ width: '90%', marginTop: 0, marginLeft: '5%', fontSize: 16, fontWeight: 500, color: '#E5E6EA', textAlign: 'center' }}
            >
                Bằng việc đăng kí, bạn chấp thuận
            </Text>
            <View
                style={{ width: '95%', marginTop: 2, marginLeft: '2.5%', flexDirection: 'row', fontSize: 16, fontWeight: 500, color: '#F0F0EF', alignItems: 'center', justifyContent: 'center' }}
            >
                <Text
                    style={{ fontSize: 16, fontWeight: 500, color: '#FFFFFF', textAlign: 'center' }}
                >
                    Điều khoản dịch vụ
                </Text>
                <Text
                    style={{ fontSize: 14, fontWeight: 500, color: '#E5E6EA', textAlign: 'center', marginLeft: 5 }}
                >
                    và
                </Text>
                <Text
                    style={{ fontSize: 16, fontWeight: 500, color: '#FFFFFF', textAlign: 'center', marginLeft: 5 }}
                >
                    Chính sách quyền riêng tư
                </Text>
            </View>
            <Text
                style={{ width: '90%', marginTop: 2, marginLeft: '5%', fontSize: 16, fontWeight: 500, color: '#E5E6EA', textAlign: 'center' }}
            >
                của Quizlet
            </Text>
            <Pressable
                style={{ width: '90%', height: 49, marginLeft: '5%', marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4254FE' }}
                onPress={handleSignUp}
            >
                <Text
                    style={{ width: 149, height: 30, fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }}
                >
                    Đăng ký
                </Text>
            </Pressable>
            <View style={{ height: 40 }} />
            {/* thông báo khi đăng kí */}
            <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F3856',
        // alignItems: 'center',
    },

});