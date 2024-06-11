import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, useWindowDimensions, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setStart } from '../../redux/userSlice';


export default function App({ navigation, route }) {
    // const BASE_URL = 'http://localhost:3000'
    const BASE_URL = 'https://zy8j3c-3000.csb.app'

    const windowDimensions = useWindowDimensions()
    const heightBottomTab = useBottomTabBarHeight() || 0
    const heightView1 = 125
    const heightView2 = windowDimensions.height - heightView1 - heightBottomTab
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    // const user = {
    //     "id": 1,
    //     "name": "Nguyen Van A",
    //     "email": "vana@example.com",
    //     "password": "hashed_password",
    //     "dob": "1990-01-01",
    //     "isGv": false
    // }


    const user = useSelector(selectUser);
    const [search, setSearch] = useState('')
    const [arrCourse, setCourse] = useState([])
    const [arrClass, setClass] = useState([])
    const [arrFolder, setFolder] = useState([])


    // get api moi
    async function getAPI() {
        try {
            const [foldersResponse, classesResponse, coursesResponse] = await Promise.all([
                fetch(`${BASE_URL}/folders?userID=${user.id}`),
                fetch(`${BASE_URL}/classes`),
                fetch(`${BASE_URL}/courses?_sort=lastOpened&_order=desc`)
            ]);
    
            const folders = await foldersResponse.json();
            let classes = await classesResponse.json();
            let courses = await coursesResponse.json();
            
            classes  = classes.filter(v => {
                return v.members.includes(user.id) || v.userID === user.id
            })


            // Xử lý courses
            courses = courses.map(item => {
                item.lastOpened = new Date(item.lastOpened);
                return item;
            });
    
            // Lọc courses
            const filteredCourses = courses.filter(v => {
                return v.userID === user.id ||
                    (v.folderID && folders.map(vF => vF.id).includes(v.folderID)) ||
                    (v.classID && classes.map(vC => vC.id).includes(v.classID));
            });
    
    
            // Xử lý dữ liệu ở đây
            console.log('Folders:', folders);
            console.log('Classes:', classes);
            console.log('Courses:', filteredCourses);

            setFolder(folders);
            setClass(classes);
            setCourse(filteredCourses);
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function countCourseByFolderID(folderID) {
        return arrCourse.reduce((pre, cur) => {
            return cur.folderID === folderID ? pre + 1 : pre
        }, 0)
    }

    function countCourseByClassID(ClassID) {
        return arrCourse.reduce((pre, cur) => {
            return cur.classID === ClassID ? pre + 1 : pre
        }, 0)
    }

    // useEffect(() => {
    //     getAPI()
    //     console.log(windowDimensions.height)
    // }, [])

    useEffect(() => {
        if (isFocused) {
            getAPI()
        }
    }, [isFocused])

    return (
        <View style={[{ flex: 1, backgroundColor: '#0A082D' }]}>
            {/* view 1: Header */}
            <View style={{ height: heightView1, }}>
                <View style={{ flex: 4, backgroundColor: '#2F3857' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FFF' }}>Quizlet</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity style={{ width: 110, height: 38, backgroundColor: '#FFCC23', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 700 }}>Nâng cấp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: 28, width: 24 }}
                                    source={require('../imgs/bell.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D9D9D9', borderRadius: 25, paddingLeft: 15, paddingRight: 15, marginLeft: 15, marginRight: 15 }}>
                        <Image
                            style={{ flex: 1, height: 24, width: 24, resizeMode: 'contain', tintColor: '#555E7A' }}
                            source={require('../imgs/search.png')}
                        />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder='Học phần, sách giáo khoa, câu hỏi'
                            style={{ flex: 10, height: 30, fontSize: 16, fontWeight: 400 }}
                        />
                        <Image
                            style={{ flex: 1, height: 24, width: 24, resizeMode: 'contain' }}
                            source={require('../imgs/camera.png')}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#2F3857', borderBottomLeftRadius: '100%', borderBottomRightRadius: '100%', marginTop: -1, }} />
            </View>


            <View style={{ height: heightView2 }}>
                <ScrollView style={{}}>
                    {/* View 1: giar */}
                    <View style={{ height: 40 }} />

                    {/* View 2: Các học phần */}
                    <View style={{ gap: 10, justifyContent: 'space-between', marginBottom: 25 }}>

                        <View style={{ height: 35, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginRight: 30 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' }}>Các học phần</Text>
                            <TouchableOpacity
                                style={{ width: 110, height: 38, justifyContent: 'center', alignItems: 'center' }}
                                // onPress={() => navigation.navigate('ThuVien', { start: 0 })}
                                onPress={() => {
                                    navigation.navigate('ThuVien')
                                    dispatch(setStart(0))
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: 700, color: '#302EAC' }}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <FlatList
                                ref={null}
                                data={arrCourse}
                                horizontal={true}
                                pagingEnabled={true}
                                renderItem={({ item }) => {

                                    return (
                                        <TouchableOpacity
                                            style={{
                                                gap: 15, height: 145, width: 325, borderWidth: 5, borderRadius: 25, borderColor: '#555E7A',
                                                justifyContent: 'space-between', marginRight: 20, padding: 10, paddingLeft: 20
                                            }}
                                            onPress={() => navigation.navigate('HocPhan',{courseId:item.id})}
                                        >
                                            <View style={{ gap: 10 }}>
                                                <Text style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>{item.title}</Text>
                                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                                    <Text style={{ fontSize: 14, fontWeight: 700, color: 'white', backgroundColor: '#2F3857', padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 20 }}>{item.vocabularies.length} thuật ngữ</Text>
                                                    <View style={{ flexDirection: 'row', gap: 10, backgroundColor: '#2F3857', width: 90, padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 20 }}>
                                                        <Image
                                                            style={{ height: 20, width: 30, resizeMode: 'contain' }}
                                                            source={require('../imgs/image.png')}
                                                        />
                                                        <Text style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>Ảnh</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 5, }}>
                                                <View style={{ borderRadius: '100%', backgroundColor: '#D21F3F', height: 29, width: 29, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 16, fontWeight: 700 }}>{user.name[0].toUpperCase()}</Text>
                                                </View>
                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{user.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>

                    </View>

                    {/* View 3: Thư mục */}
                    <View style={{ gap: 10, justifyContent: 'space-between', marginBottom: 25 }}>

                        <View style={{ height: 35, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginRight: 30 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' }}>Thư mục</Text>
                            <TouchableOpacity
                                style={{ width: 110, height: 38, justifyContent: 'center', alignItems: 'center' }}
                                // onPress={() => navigation.navigate('ThuVien', { start: 2 })}
                                onPress={() => {
                                    navigation.navigate('ThuVien')
                                    dispatch(setStart(2))
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: 700, color: '#302EAC' }}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <FlatList
                                ref={null}
                                // data={[{}, {}, {}, {}]}
                                data={arrFolder}
                                horizontal={true}
                                pagingEnabled={true}
                                renderItem={({ item }) => {

                                    return (
                                        <TouchableOpacity
                                            style={{
                                                height: 100, width: 325, borderWidth: 5, borderRadius: 25, borderColor: '#555E7A',
                                                justifyContent: 'space-around', marginRight: 20, padding: 10, paddingLeft: 20
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Image
                                                    style={{ height: 24, width: 28, resizeMode: 'contain' }}
                                                    source={require('../imgs/folder2.png')}
                                                />
                                                <Text style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{item.name}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 14, fontWeight: 700, color: 'white' }}> {countCourseByFolderID(item.id)} học phần</Text>
                                                <View style={{ height: 25, width: 3, backgroundColor: '#555E7A' }} />
                                                <View style={{ flexDirection: 'row', gap: 5, }}>
                                                    <View style={{ borderRadius: '100%', backgroundColor: '#D21F3F', height: 29, width: 29, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: 700 }}>{user.name[0].toUpperCase()}</Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{user.name}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>

                    </View>

                    {/* View 4: Lớp học */}
                    <View style={{ gap: 10, justifyContent: 'space-between', marginBottom: 15 }}>

                        <View style={{ height: 35, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginRight: 30 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' }}>Lớp học</Text>
                            <TouchableOpacity
                                style={{ width: 110, height: 38, justifyContent: 'center', alignItems: 'center' }}
                                // onPress={() => {
                                //     navigation.navigate('ThuVien', { start: 1, key: Date.now()})
                                // }}
                                onPress={() => {
                                    navigation.navigate('ThuVien')
                                    dispatch(setStart(1))
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: 700, color: '#302EAC' }}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <FlatList
                                ref={null}
                                // data={[{}, {}, {}, {}]}
                                data={arrClass}
                                horizontal={true}
                                pagingEnabled={true}
                                renderItem={({ item }) => {

                                    return (
                                        <TouchableOpacity
                                            style={{
                                                gap: 10, height: 150, width: 325, borderWidth: 5, borderRadius: 25, borderColor: '#555E7A',
                                                justifyContent: 'space-between', marginRight: 20, padding: 10, paddingLeft: 20
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                                <View style={{ flex: 8, gap: 5 }}>
                                                    <Text style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{item.name}</Text>
                                                    <Text style={{ fontSize: 14, fontWeight: 400, color: 'white' }}>{item.desc}</Text>
                                                </View>
                                                <Image
                                                    style={{ flex: 2, height: 35, width: 35, resizeMode: 'contain' }}
                                                    source={require('../imgs/userFriends.png')}
                                                />
                                            </View>

                                            <View style={{ gap: 5, }}>
                                                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                    <Image
                                                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                                                        source={require('../imgs/clone.png')}
                                                    />
                                                    <Text style={{ fontSize: 16, fontWeight: 400, color: 'white' }}>{countCourseByClassID(item.id)} học phần</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                    <Image
                                                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                                                        source={require('../imgs/user.png')}
                                                    />
                                                    <Text style={{ fontSize: 16, fontWeight: 400, color: 'white' }}>{item.members.length} thành viên</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>

                    </View>
                </ScrollView>


            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A082D',
    },
});
