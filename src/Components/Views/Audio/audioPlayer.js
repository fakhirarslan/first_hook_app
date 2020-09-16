import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import Nav from '../Header/header';
import history from '../../Utils/history';
import { songs } from './songs';

import { Select, Layout, Divider, List, Typography } from 'antd';
import { removeUserSession, getUser } from '../../Utils/common';

import '../Audio/audioStyle.css';

const { Option } = Select;
const { Header, Content, Footer } = Layout;

function AudioPlayer(props) {

    const [songName, setSongName] = useState([]);
    const [searchRender, setSearchRender] = useState(<div></div>);
    const [selectValues, setSelectValues] = useState(false);
    const [songList, setSongList] = useState(<Option></Option> );

    const data = songs.map((item) => {
        var name = item.split('.');
        songName.push(name[0]);
        console.log(item);
        return (
            <ReactAudioPlayer className="song-player" src={item} controls />
        );
    });
    
    const option = songName.map(
        (name, index) => { return <Option key={index} value={name}>{name}</Option> }
    );

    useEffect(() => {
        if (selectValues) {
            return songList
        } else {
            setSongList(option);
        }
    }, [selectValues]);

    const handleLogout = () => {
        removeUserSession();
        history.push('/login');
        history.go();
    }

    const onSearch = (val) => {
        console.log(val);
    }

    const onChange = (value) => {
        console.log(value + ".mp3");
        setSelectValues(true);
        setSearchRender(() => {
            return (
                <List className="list" bordered>
                    <List.Item className="list-item">
                        <Typography.Text className="song-names">{value}</Typography.Text> {<ReactAudioPlayer onPlay={btn} className="song-player" src={value + ".mp3"} controls />}
                    </List.Item>
                </List>
            );
        });
    }

    const btn = () => {
        var el = document.getElementsByClassName("song-player");
        console.log(el.item);
        // for(var i=0; i<el.length; i++) {
        //     el[i].pause();
        // }
    }

    return (
        <div>
            <Layout className="layout">
                <Header>
                    <Nav handleLogout={handleLogout} user={getUser()} />
                </Header>
                <Content>
                    <div className="site-layout-content">
                        <Divider className="playlist-divider" orientation="left">Playlist</Divider>
                        <div className="select-div">
                            <Select
                                className="select"
                                showSearch
                                placeholder="Select a song"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {songList}
                            </Select>
                        </div>
                        {searchRender}
                        <List
                            className="list"
                            bordered
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item className="list-item">
                                    <Typography.Text className="song-names">{songName[index]}</Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>
                <Footer>Copyrights 2020</Footer>
            </Layout>
        </div>
    )
}

export default AudioPlayer;
