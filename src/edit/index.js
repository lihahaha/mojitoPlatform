/**
 * @description 编辑器打包总入口
 */
import { Headers, DOMIN } from '../global';
import React from 'react';
import ReactDom from 'react-dom';
import Board from './board';
import App from '../reducer';
import { message } from 'antd';
import './style/antd.less';

window.ENV = 'edit';

// 拉取当前页面的JSON配置、组件菜单后再渲染编辑器
Promise.all([
    fetch(DOMIN + '/loadPage', {
        method: 'POST',
        headers: Headers.json
    }).then(response => response.json()),
    fetch(DOMIN + '/getCompMenu', {
        method: 'POST',
        headers: Headers.json
    }).then(response => response.json())
]).then(([resPage, resMenu]) => {
    if (resPage.error !== 0) {
        message.error(resPage.msg);
        return;
    }
    if (resMenu.error !== 0) {
        message.error(resMenu.msg);
        return;
    }
    ReactDom.render(
        <App
            tree={resPage.data}
            menu={resMenu.data}
        >
            <Board />
        </App>
        , document.getElementById('edit')
    );
});