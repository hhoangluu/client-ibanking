import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

import { Menu, Button, Modal, Space } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import { TransferPage } from '../TransferPage'
import { MyAccountPage } from '../MyAccountPage/MyAccountPage'
import { BeneficiaryInforPage } from '../BeneficiaryInforPage/BeneficiaryInforPage'
import {TransactionsTransferPage} from '../TransactionsHistoryPage/TransactionsTransfer/TransactionsTransferPage'
import { CreateDebtPage } from '../DebtManagementPage/CreateDebtPage'
import { ChangePasswordPage } from '../ChangePasswordPage/ChangePasswordPage'
import { TransferInterBankPage } from '../TransferPage'

const { SubMenu } = Menu;


const comp = [
    {
        title: "Danh sach tai khoan",
        content: <MyAccountPage />,
    },
    {
        title: "Thong tin",
        content: <BeneficiaryInforPage />,
    },
    {
        title: "Lịch sử giao dịch",
        content: <TransactionsTransferPage/>,
    },
    {
        title: "Chuyển hàng nội địa",
        content: <TransferPage />,
    },
    {
        title: "Ngân hàng khác",
        content: <TransferInterBankPage />,
    },
    {
        title: "Danh sách nợ",
        content: <CreateDebtPage />,
    },
    {
        content: "Danh sách người nhận",
        content: "Page 3",
    },
    {
        title: "change password",
        content: <ChangePasswordPage />,
    },
];

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            key: "0"
        }
    }
    componentDidMount() {
        this.props.userActions();
        this.props.getListBeneficiaryAccount();
        this.props.getAccount();
        // let user = JSON.parse(localStorage.getItem('user'));
    }

    handleDeleteUser(id) {
        //return (e) => this.props.dispatch(userActions.delete(id));
        return null;
    }


    render() {
        const { user, users } = this.props;

        const toggleCollapsed = () => {
            this.setState({
                collapsed: !this.state.collapsed,
            }); 
        };
        const handleClick = e => {
            this.setState({
                key: e.key,
            });
        };

        // console.log("user");
        // console.log(this.props.users);
        return (
            <div className="row" >
                <div className="col-2" style={{ backgroundColor: '#000c17' }}>
                    <div  >
                        {/* <Button type="primary" onClick={toggleCollapsed} >
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button> */}
                        <Menu
                            defaultSelectedKeys={['0']}
                            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                            onClick={handleClick}
                        >
                            <Menu.Item key="0" icon={<PieChartOutlined />} >
                                Danh sách tài khoản
                </Menu.Item>
                            <Menu.Item key="1" icon={<DesktopOutlined />}>
                                Thông tin
                </Menu.Item>
                            <Menu.Item key="2" icon={<ContainerOutlined />}>
                                Lịch sử giao dịch
                </Menu.Item>
                            <SubMenu key="sub1" icon={<MailOutlined />} title="Chuyển tiền">
                                <Menu.Item key="3">Ngân hàng nội địa</Menu.Item>
                                <Menu.Item key="4">Ngân hàng khác</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Danh sách">
                                <Menu.Item key="5">Danh sách nợ</Menu.Item>
                                <Menu.Item key="6">Danh sách người nhận</Menu.Item>
                                <SubMenu key="sub3" title="Tài khoản">
                                    <Menu.Item key="7">Đổi mật khẩu</Menu.Item>
                                    <Menu.Item ><LogoutOutlined /> <Link to="/login">Logout</Link></Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </div>
                </div>
                <div className="col-8 offset-1"> <h2> {comp[this.state.key].title}</h2>
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.success && <span className="text-success">SUCCESS: {users.success}</span>}
                    {comp[this.state.key].content}

                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const mapDispatchToProps = (dispatch) => ({
    userActions: () => dispatch(userActions.getAll()),
    getAccount: () => dispatch(userActions.getAccount()),
    getListBeneficiaryAccount: () => dispatch(userActions.getBeneficiaryAccounts()),
});

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };
