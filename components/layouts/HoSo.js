import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';



export default function HoSo({ navigation, route }) {

    const user = useSelector(selectUser)
    const NAME_OF_USER = user.name// Tên của user đăng nhập
    const FIRST_CHAR_OF_NAME = NAME_OF_USER.charAt(0).toUpperCase(); // Chữ cái đầu của tên user đăng nhập
    const DATE = format(new Date(), 'dd-MM-yyyy')


    const handleNavigate = () => {
        navigation.navigate('CaiDat');
    }



    return (
        <ScrollView style={styles.container}>
            <View style={{ width: '90%', height: 50, marginLeft: '5%', marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 55, height: 50, marginTop: 0, backgroundColor: '#D21F3F', justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                    <Text
                        style={{ fontSize: 30, fontWeight: 'bold', color: '#FFF', textAlign: 'center' }}
                    >
                        {FIRST_CHAR_OF_NAME}
                    </Text>
                </View>
            </View>
            <View style={{ width: '90%', height: 50, marginLeft: '5%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 150, height: 50, marginTop: 0, backgroundColor: '#0A082D', alignItems: 'center' }}>
                    <Text
                        style={{ fontSize: 30, fontWeight: 'bold', color: '#FFF', textAlign: 'center' }}
                    >
                        {NAME_OF_USER}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={{ width: '80%', height: 90, marginLeft: '10%', marginTop: 20, borderRadius: 10, borderWidth: 1, borderColor: '#FFFFFF' }}
                onPress={handleNavigate}
            >
                <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                    {/* View for icon */}
                    <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="user-cog" size={30} color="blue" />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                        <Text
                            style={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}
                        >
                            Cài đặt của bạn
                        </Text>
                    </View>
                    {/* View for icon */}
                    <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="right" size={30} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ width: '95%', height: 30, marginTop: 30, marginLeft: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ width: 100, height: 25, marginLeft: 10, fontSize: 18, fontWeight: '600', color: '#FFFFFF' }}>
                    Thành tựu
                </Text>
                <TouchableOpacity style={{ width: 100, height: 25, fontSize: 16, fontWeight: '600', color: '#423DD7' }}>
                    Xem tất cả
                </TouchableOpacity>
            </View>
            <View style={styles.thanhtuu}>
                <View style={styles.child1TT}>
                    <Image
                        source={require('../imgs/Cup.png')}
                        style={styles.imgCup1}
                    />
                    <Text style={{ width: 150, height: 25, marginTop: 15, fontSize: 16, fontWeight: '700', color: '#FFF', textAlign: 'center' }}>
                        Chuỗi 10 tuần
                    </Text>
                    <Text style={{ width: 150, height: 25, fontSize: 14, fontWeight: '700', color: 'grey', textAlign: 'center' }}>
                        {DATE}
                    </Text>
                </View>
                <View style={styles.child2TT}>
                    <Image
                        source={require('../imgs/Cup1.png')}
                        style={styles.imgCup1}
                    />
                    <Text style={{ width: 150, height: 25, marginTop: 15, fontSize: 16, fontWeight: '700', color: 'grey', textAlign: 'center' }}>
                        Chuỗi 20 tuần
                    </Text>
                    <Text style={{ width: 150, height: 25 }} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A082D',
        // alignItems: 'center',
    },
    thanhtuu: {
        width: '90%',
        height: 200,
        marginTop: 30,
        marginLeft: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        flexDirection: 'row'
    },
    child1TT: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    child2TT: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgCup1: {
        width: 120,
        height: 101
    }
});