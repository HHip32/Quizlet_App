import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
// import { date } from 'date-fns/locale';



const SCREEN_WIDTH = 300;
const DOT_PAGE_SIZE = 7;

export default function HocPhan({ route }) {

    const user = useSelector(selectUser)
    const NAME_OF_USER = user.name// Tên của user đăng nhập
    const FIRST_CHAR_OF_NAME = NAME_OF_USER.charAt(0).toUpperCase(); 

    // fetch api

    const COURSE_ID = route.params?.courseId ? route.params.courseId : 1; // Id lấy từ route

    const BASE_URL = `https://zy8j3c-3000.csb.app/courses?id=${COURSE_ID}`

    const BASE_URL_UPDATE = `https://zy8j3c-3000.csb.app/courses/${COURSE_ID}`

    // const NAME_OF_USER = "hhiep32";
    // const FIRST_CHAR_OF_NAME = NAME_OF_USER.charAt(0);

    const [data, setData] = useState([]); // data của vocabularies
    const [allData, setAllData] = useState({});


    const fetchData = async () => {

        fetch(BASE_URL)
            .then(response => response.json())
            .then((json) => {
                setAllData(json[0])
                setData(json[0].vocabularies)
            })
            .catch(error => console.error(error))

    };



    // Cập nhật lastOpened


    // Xử lí khi trang được truy cập để cập nhật lastOpened

    const isFocused = useIsFocused();

    const updateLastOpenedInAPI = async () => {
        try {
            // Gửi yêu cầu cập nhật lastOpened lên API ở đây
            // Sử dụng fetch hoặc axios để gửi yêu cầu lên server
            const response = await fetch(BASE_URL_UPDATE, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // Bạn có thể thêm các header cần thiết khác tại đây
                },
                body: JSON.stringify({
                    lastOpened: new Date(),
                }),
            });
            // Xử lý phản hồi từ API nếu cần
            const data = await response.json();
        } catch (error) {
            console.error('Error updating lastOpened:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            updateLastOpenedInAPI();
        }
    }, [isFocused]);

    useEffect(() => {
        fetchData();
    }, []);

    const renderItemOfVocalbulary = ({ item, index }) => {
        return (
            <View style={[styles.viewOfFlatlist, { marginTop: index === 0 ? 20 : 20 }]}>
                <Text style={styles.textOfFlatlist}>{item.vocabulary}</Text>
            </View>
        );
    };
    //handle scroll

    const renderItemOfDot = ({ item, index }) => (
        <View style={{ flexDirection: 'row', height: 15 }}>
            <View style={[styles.dot, { opacity: Math.floor(scrollOffset / SCREEN_WIDTH) === index ? 1 : 0.5 }]} key={item.id} />
        </View>
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);
    const flatlistRef = useRef(null);



    const handleScroll = (event) => {
        const offset = event.nativeEvent.contentOffset.x;
        setScrollOffset(offset);
        const currentIndex = Math.floor(offset / SCREEN_WIDTH);
        setCurrentPage(currentIndex);
    };


    return (
        <ScrollView style={styles.container}>
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItemOfVocalbulary}
                    // keyExtractor={item => item.id}
                    keyExtractor={item => (item && item.id ? item.id.toString() : '')}

                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    pagingEnabled
                    onMomentumScrollEnd={e => {
                        const offset = e.nativeEvent.contentOffset.x;
                        const currentIndex = Math.floor(offset / SCREEN_WIDTH);
                        setCurrentPage(currentIndex);
                    }}
                    onScroll={handleScroll}
                    ref={flatlistRef}
                />
            </View>
            <View style={{ width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={data}
                    renderItem={renderItemOfDot}
                    // keyExtractor={item => item.id.toString()}
                    keyExtractor={item => (item && item.id ? item.id.toString() : '')}
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    // contentContainerStyle={{ width: Math.min(data.length * 20, 7 * 20) }}
                    onScroll={handleScroll}
                />
            </View>
            <View style={{ width: '90%', height: 30, marginTop: 10, marginLeft: '5%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: '600', color: 'white' }}>
                    Điểm trí nhớ của bạn
                </Text>
                <Entypo name="dots-three-horizontal" size={28} color="white" />
            </View>
            <View style={{ width: '90%', height: 130, marginLeft: '5%', marginTop: 15, backgroundColor: '#2F3856', alignItems: 'center' }}>
                <View style={{ width: '80%', height: 25, marginTop: 30, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text style={{ width: 60, height: 25, fontSize: 18, fontWeight: '650', color: 'white' }}>
                        1 ngày
                    </Text>
                    <Text style={{ width: 60, height: 25, fontSize: 18, fontWeight: '650', color: 'white' }}>
                        1 tuần
                    </Text>
                    <Text style={{ width: 65, height: 25, fontSize: 18, fontWeight: '650', color: 'white' }}>
                        1 tháng
                    </Text>
                </View>
                <View style={{ width: '85%', marginTop: 10, borderWidth: 2, borderColor: '#555E7A' }} />
                <View style={{ width: '90%', height: 40, flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ width: '70%', height: 35, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ width: 34, backgroundColor: 'white', borderWidth: 1, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Feather name="clock" size={35} color="#5EC7F6" />
                        </View>
                        <Text style={{ width: 120, height: 22, color: '#5EC7F6', fontSize: 18, fontWeight: 600, marginTop: 5 }}>
                            trí nhớ 1 ngày
                        </Text>
                    </View>
                    <Text style={{ width: 80, color: '#5EC7F6', fontSize: 30, fontWeight: 800, marginLeft: 20 }}>
                        97%
                    </Text>
                </View>

            </View>
            <View style={{ width: '90%', height: 36, marginLeft: '5%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 32, fontWeight: '600', color: 'white' }}>
                    {allData.title}
                </Text>
                <MaterialCommunityIcons name="download-circle-outline" size={38} color="white" />
            </View>
            <View style={{ width: '90%', height: 48, marginLeft: '5%', marginTop: 20, flexDirection: 'row' }}>
                <View style={{ width: '50%', height: '100%', flexDirection: 'row', borderRightWidth: 1, borderColor: 'white' }}>
                    <View style={{ width: 43, height: 41, justifyContent: 'center', alignItems: 'center', backgroundColor: '#AA46BC', borderWidth: 1, borderRadius: 100, borderColor: '#AA46BC' }}>

                        <Text style={{ fontSize: 30, fontWeight: '700', color: 'white' }}>{FIRST_CHAR_OF_NAME}</Text>
                    </View>
                    <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: '600', color: 'white' }}>{NAME_OF_USER}</Text>
                </View>
                <View style={{ width: '60%', height: '100%', flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 20, fontSize: 25, fontWeight: '600', color: 'white' }}>{data.length} thuật ngữ</Text>
                </View>
            </View>
            <View style={{ width: '90%', height: 80, marginLeft: '5%', marginTop: 10, flexDirection: 'row', backgroundColor: '#2F3856', borderWidth: 1, borderRadius: 10, borderColor: '#2F3856' }}>
                <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="credit-card-multiple-outline" size={35} color="#4254FE" />
                </View>
                <View style={{ width: '80%', height: '100%', marginTop: 10 }}>
                    <Text style={{ width: 120, height: 23, fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                        Thẻ ghi nhớ
                    </Text>
                    <Text style={{ width: 230, height: 23, fontSize: 14, marginTop: 10, color: '#B4BECD', fontWeight: '500' }}>
                        ôn lại các thuật ngữ và định nghĩa
                    </Text>
                </View>
            </View>
            <View style={{ width: '90%', height: 80, marginLeft: '5%', marginTop: 10, flexDirection: 'row', backgroundColor: '#2F3856', borderWidth: 1, borderRadius: 10, borderColor: '#2F3856' }}>
                <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="progress-clock" size={35} color="#4254FE" />
                </View>
                <View style={{ width: '80%', height: '100%', marginTop: 10 }}>
                    <Text style={{ width: 120, height: 23, fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                        Học
                    </Text>
                    <Text style={{ width: 230, height: 23, fontSize: 14, marginTop: 10, color: '#B4BECD', fontWeight: '500' }}>
                        Tập trung với một lộ trình cụ thể
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A082D',
    },
    viewOfFlatlist: {
        width: 300,
        height: 190,
        borderWidth: 1,
        borderColor: '#2F3856',
        borderRadius: 10,
        backgroundColor: '#2F3856',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginTop: 20
    },
    textOfFlatlist: {
        width: 200,
        height: 26,
        fontSize: 28,
        fontWeight: 400,
        color: '#FFFFFF',
        textAlign: 'center'

    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 8,
    }
});