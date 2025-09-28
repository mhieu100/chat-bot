import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Select, 
  Checkbox, 
  Button, 
  Radio, 
  InputNumber, 
  Space, 
  Divider,
  Tag,
  Row,
  Col
} from 'antd';
import { 
  UserOutlined, 
  HeartOutlined, 
  EnvironmentOutlined,
  MedicineBoxOutlined,
  SendOutlined 
} from '@ant-design/icons';

const { Option } = Select;

const VaccineConsultationForm = ({ onSubmit, onSkip }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    // Format the data into a natural message
    const formatMessage = (data) => {
      const parts = [];
      
      if (data.age) parts.push(`Tôi ${data.age} tuổi`);
      if (data.gender) parts.push(`giới tính ${data.gender}`);
      if (data.healthCondition) parts.push(`tình trạng sức khỏe: ${data.healthCondition}`);
      if (data.purpose && data.purpose.length > 0) {
        parts.push(`mục đích tiêm: ${data.purpose.join(', ')}`);
      }
      if (data.location) parts.push(`đang sống tại ${data.location}`);
      if (data.allergies && data.allergies.length > 0) {
        parts.push(`có dị ứng với: ${data.allergies.join(', ')}`);
      }
      if (data.chronicDiseases && data.chronicDiseases.length > 0) {
        parts.push(`có bệnh mãn tính: ${data.chronicDiseases.join(', ')}`);
      }
      if (data.pregnancy) parts.push('đang mang thai');
      if (data.travelDestination) parts.push(`sắp đi du lịch ${data.travelDestination}`);
      
      return `Xin chào! ${parts.join(', ')}. Vui lòng tư vấn vaccine phù hợp cho tôi.`;
    };

    const message = formatMessage(values);
    
    setTimeout(() => {
      onSubmit(message);
      setLoading(false);
    }, 500);
  };

  return (
    <Card
      style={{
        maxWidth: 700,
        margin: '0 auto',
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
      title={
        <div style={{ textAlign: 'center' }}>
          <MedicineBoxOutlined style={{ color: '#52c41a', fontSize: 24, marginRight: 8 }} />
          <span style={{ fontSize: 18, fontWeight: 600, color: '#262626' }}>
            Thông tin tư vấn vaccine
          </span>
        </div>
      }
      headStyle={{ 
        borderBottom: '2px solid #f0f0f0',
        background: 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)'
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          healthCondition: 'Khỏe mạnh',
          purpose: [],
          allergies: [],
          chronicDiseases: [],
          pregnancy: false
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={
                <span>
                  <UserOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                  Tuổi của bạn
                </span>
              }
              name="age"
              rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}
            >
              <InputNumber
                min={0}
                max={120}
                placeholder="Nhập tuổi"
                style={{ width: '100%' }}
                size="large"
              />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label="Giới tính"
              name="gender"
            >
              <Radio.Group size="large">
                <Radio.Button value="nam">Nam</Radio.Button>
                <Radio.Button value="nữ">Nữ</Radio.Button>
                <Radio.Button value="khác">Khác</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={
            <span>
              <HeartOutlined style={{ marginRight: 8, color: '#ff4d4f' }} />
              Tình trạng sức khỏe hiện tại
            </span>
          }
          name="healthCondition"
        >
          <Select size="large" placeholder="Chọn tình trạng sức khỏe">
            <Option value="Khỏe mạnh">💪 Khỏe mạnh, không có vấn đề gì</Option>
            <Option value="Sức khỏe ổn">😊 Sức khỏe ổn, không có bệnh lý nghiêm trọng</Option>
            <Option value="Có vấn đề sức khỏe nhỏ">🤒 Có một số vấn đề sức khỏe nhỏ</Option>
            <Option value="Đang điều trị bệnh">🏥 Đang điều trị một số bệnh lý</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span>
              <MedicineBoxOutlined style={{ marginRight: 8, color: '#52c41a' }} />
              Mục đích tiêm vaccine (có thể chọn nhiều)
            </span>
          }
          name="purpose"
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Checkbox value="Phòng bệnh định kỳ">
                  <Tag color="blue">🛡️ Phòng bệnh định kỳ</Tag>
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Du lịch">
                  <Tag color="green">✈️ Du lịch</Tag>
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Công việc">
                  <Tag color="orange">💼 Yêu cầu công việc</Tag>
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Mang thai">
                  <Tag color="pink">🤱 Chuẩn bị mang thai</Tag>
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Gia đình có trẻ em">
                  <Tag color="purple">👶 Gia đình có trẻ em</Tag>
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox value="Theo lời khuyên bác sĩ">
                  <Tag color="red">👨‍⚕️ Theo lời khuyên bác sĩ</Tag>
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          label={
            <span>
              <EnvironmentOutlined style={{ marginRight: 8, color: '#722ed1' }} />
              Khu vực sinh sống
            </span>
          }
          name="location"
        >
          <Select size="large" placeholder="Chọn khu vực bạn đang sống">
            <Option value="Hà Nội">🏛️ Hà Nội</Option>
            <Option value="TP.HCM">🏙️ TP. Hồ Chí Minh</Option>
            <Option value="Đà Nẵng">🌊 Đà Nẵng</Option>
            <Option value="Cần Thơ">🌾 Cần Thơ</Option>
            <Option value="Hải Phòng">⚓ Hải Phòng</Option>
            <Option value="Miền Bắc khác">🏔️ Miền Bắc khác</Option>
            <Option value="Miền Trung khác">🏖️ Miền Trung khác</Option>
            <Option value="Miền Nam khác">🌴 Miền Nam khác</Option>
            <Option value="Nước ngoài">🌍 Nước ngoài</Option>
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Dị ứng (nếu có)"
              name="allergies"
            >
              <Checkbox.Group>
                <Space direction="vertical">
                  <Checkbox value="Penicillin">💊 Penicillin</Checkbox>
                  <Checkbox value="Trứng">🥚 Trứng</Checkbox>
                  <Checkbox value="Latex">🧤 Latex</Checkbox>
                  <Checkbox value="Thực phẩm biển">🦐 Hải sản</Checkbox>
                  <Checkbox value="Khác">❓ Dị ứng khác</Checkbox>
                </Space>
              </Checkbox.Group>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Bệnh mãn tính (nếu có)"
              name="chronicDiseases"
            >
              <Checkbox.Group>
                <Space direction="vertical">
                  <Checkbox value="Tiểu đường">🩸 Tiểu đường</Checkbox>
                  <Checkbox value="Cao huyết áp">💓 Cao huyết áp</Checkbox>
                  <Checkbox value="Tim mạch">❤️ Bệnh tim mạch</Checkbox>
                  <Checkbox value="Hen suyễn">🫁 Hen suyễn</Checkbox>
                  <Checkbox value="Khác">❓ Bệnh khác</Checkbox>
                </Space>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="pregnancy" valuePropName="checked">
          <Checkbox style={{ fontSize: 16 }}>
            <span style={{ color: '#ff4d4f' }}>🤱 Tôi đang mang thai hoặc có kế hoạch mang thai</span>
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="Điểm đến du lịch (nếu có)"
          name="travelDestination"
        >
          <Select size="large" placeholder="Chọn nếu bạn có kế hoạch du lịch">
            <Option value="">Không có kế hoạch du lịch</Option>
            <Option value="Đông Nam Á">🏝️ Đông Nam Á</Option>
            <Option value="Châu Âu">🏰 Châu Âu</Option>
            <Option value="Châu Mỹ">🗽 Châu Mỹ</Option>
            <Option value="Châu Phi">🦁 Châu Phi</Option>
            <Option value="Châu Á">🏯 Châu Á khác</Option>
            <Option value="Australia">🦘 Australia/Oceania</Option>
          </Select>
        </Form.Item>

        <Divider />

        <Form.Item>
          <Space size="middle" style={{ width: '100%', justifyContent: 'center' }}>
            <Button
              size="large"
              onClick={onSkip}
              style={{ minWidth: 120 }}
            >
              Bỏ qua
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              icon={<SendOutlined />}
              style={{
                minWidth: 200,
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
                fontWeight: 600
              }}
            >
              Nhận tư vấn ngay
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default VaccineConsultationForm;