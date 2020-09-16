import React, { useState } from 'react';

import Nav from '../Header/header';
import history from '../../Utils/history';

import { Select, Layout, Card, Upload, message } from 'antd';
import { removeUserSession, getUser } from '../../Utils/common';
import { InboxOutlined } from '@ant-design/icons';

import '../Audio/audioStyle.css';
import useSelection from 'antd/lib/table/hooks/useSelection';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Dragger } = Upload;

function AudioPlayer() {

    const handleLogout = () => {
        removeUserSession();
        history.push('/login');
        history.go();
    }

    const info = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div>
            <Layout className="layout">
                <Header>
                    <Nav handleLogout={handleLogout} user={getUser()} />
                </Header>
                <Content>
                    <div className="site-layout-content">
                        <Card className="song-card" title="Add Song" bordered={false} hoverable={true}>
                            <Dragger {...info}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single music file with the like mp3, wav, etc.
                                </p>
                            </Dragger>
                        </Card>
                    </div>
                </Content>
                <Footer>Copyrights 2020</Footer>
            </Layout>
        </div>
    )
}

export default AudioPlayer;
