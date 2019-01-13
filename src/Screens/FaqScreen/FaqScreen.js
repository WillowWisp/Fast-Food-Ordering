import React from 'react';
import { StatusBar } from 'react-native';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, StyleProvider, Accordion, Text } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';


const dataArray = [
  { title: "Đơn hàng của tôi có được duyệt chưa?", content: "- Quý khách sẽ nhận được mail xác nhận hoặc xem ở phần trạng thái đơn hàng trong app, nếu không thì hãy liên hệ với chúng tôi để được hỗ trợ." },
  { title: "Thay đổi đơn hàng sau xác nhận?", content: "- Chúng tôi có thể thay đổi đơn hàng nếu bộ phận làm thức ăn chưa bắt đầu làm đơn của quý khách. Quý khách thay đổi càng sớm càng tốt." },
  { title: "Phí giao hàng?", content: "- Phí giao hàng tiêu chuẩn thường rơi vào khoảng 12.000 VNĐ tới 22.000 VNĐ." },
  { title: "App có tính bảo mật cao không?", content: "- Mọi đơn hàng đều được thanh toán qua Database của Google. Tính bảo mật cao." },
  { title: "Giao hàng thường mất bao lâu?", content: "- Đa số đơn hàng đều được giao trong khoảng 30-45’, nếu giao thông và số lượng đơn đặt hàng thuận lợi thì có thể nhanh hơn. Kể cả vào nhưng ngày đông khách và đông xe, chúng tôi vẫn cố gắng sắp xếp sao cho đơn hàng tới tay quí khách từ 45 phút tới 1 tiếng." },
  { title: "Làm sao để liên hệ?", content: "- Quý khách có thể tới các chi nhánh cửa hàng (địa chỉ  trong mục 'Cửa hàng') hoặc có thể gọi với chúng tôi qua số điện thoại 090-666-6666." },
];

class FaqScreen extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  render() {
    return (
      <StyleProvider style={getTheme(customizedTheme)}>
        <Container>
          <Header style={{ height: 70, }}>
            <Left>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>FAQ</Title>
            </Body>
            <Right />
          </Header>

          <Content padder>
            <Accordion
              dataArray={dataArray}
              headerStyle={{backgroundColor: '#E3671F', color: 'white'}}
              contentStyle={{backgroundColor: '#fca383'}}
              expanded={0}
            />
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default FaqScreen;
