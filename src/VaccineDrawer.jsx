import { useState } from 'react';
import { 
  Drawer, 
  Card, 
  Button, 
  Tag, 
  Space, 
  Typography, 
  List, 
  Divider,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  message,
  Row,
  Col,
  Badge
} from 'antd';
import { 
  MedicineBoxOutlined, 
  CalendarOutlined, 
  DollarOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const VaccineDrawer = ({ 
  open, 
  onClose, 
  vaccines = [], 
  onAskAboutVaccine,
  title = "Gợi ý Vaccine phù hợp" 
}) => {
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [form] = Form.useForm();

  const getCategoryColor = (category) => {
    const colors = {
      'routine_children': 'blue',
      'routine_adults': 'green', 
      'travel': 'orange',
      'occupational': 'purple',
      'special_groups': 'red'
    };
    return colors[category] || 'default';
  };

  const getCategoryName = (category) => {
    const names = {
      'routine_children': 'Tiêm chủng định kỳ - Trẻ em',
      'routine_adults': 'Tiêm chủng định kỳ - Người lớn',
      'travel': 'Vaccine du lịch',
      'occupational': 'Vaccine nghề nghiệp', 
      'special_groups': 'Vaccine nhóm đặc biệt'
    };
    return names[category] || category;
  };

  const getAgeGroupDisplay = (ageGroups) => {
    const displayMap = {
      'infant': '👶 Sơ sinh (0-2 tuổi)',
      'child': '🧒 Trẻ em (2-12 tuổi)',
      'teen': '🧑‍🎓 Thiếu niên (13-17 tuổi)',
      'adult': '👨‍💼 Người lớn (18-64 tuổi)',
      'senior': '👴 Cao tuổi (65+ tuổi)',
      'all_ages': '👥 Mọi lứa tuổi'
    };
    
    return ageGroups.map(age => displayMap[age] || age).join(', ');
  };

  const handleBookAppointment = (vaccine) => {
    setSelectedVaccine(vaccine);
    setAppointmentModal(true);
    form.resetFields();
    
    // Set default values
    form.setFieldsValue({
      vaccine_name: vaccine.name,
      appointment_date: dayjs().add(7, 'day'), // Default to next week
      appointment_time: dayjs().hour(9).minute(0), // Default to 9:00 AM
      priority: 'normal'
    });
  };

  const handleSubmitAppointment = async () => {
    try {
      const values = await form.validateFields();
      
      // Format appointment data
      const appointmentData = {
        ...values,
        vaccine_id: selectedVaccine.id,
        vaccine_name: selectedVaccine.name,
        appointment_date: values.appointment_date.format('YYYY-MM-DD'),
        appointment_time: values.appointment_time.format('HH:mm'),
        created_at: new Date().toISOString()
      };

      console.log('Appointment Data:', appointmentData);
      
      // TODO: Send to backend API
      // await bookAppointment(appointmentData);
      
      message.success(`Đã đặt lịch tiêm ${selectedVaccine.name} thành công!`);
      message.info('Chúng tôi sẽ liên hệ với bạn để xác nhận lịch hẹn trong 24h.');
      
      setAppointmentModal(false);
      setSelectedVaccine(null);
      form.resetFields();
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      message.error('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại sau.');
    }
  };

  const handleAskAboutVaccine = (vaccine) => {
    const question = `Hãy cho tôi biết chi tiết về vaccine ${vaccine.name} (${vaccine.english_name || vaccine.name})`;
    onAskAboutVaccine(question);
    onClose(); // Close drawer after asking
  };

  return (
    <>
      <Drawer
        title={
          <Space>
            <MedicineBoxOutlined style={{ color: '#1890ff' }} />
            <span>{title}</span>
            <Badge count={vaccines.length} showZero color="#52c41a" />
          </Space>
        }
        placement="right"
        width={600}
        onClose={onClose}
        open={open}
        style={{ zIndex: 1001 }}
        bodyStyle={{ padding: '16px' }}
      >
        {vaccines.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <MedicineBoxOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
            <div style={{ marginTop: 16, fontSize: '16px', color: '#999' }}>
              Không có vaccine nào được tìm thấy
            </div>
          </div>
        ) : (
          <List
            dataSource={vaccines}
            renderItem={(vaccine) => (
              <List.Item style={{ padding: 0, marginBottom: 16 }}>
                <Card
                  size="small"
                  style={{ width: '100%' }}
                  title={
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Space direction="vertical" size={0}>
                          <Text strong style={{ fontSize: '16px' }}>
                            {vaccine.name}
                          </Text>
                          {vaccine.english_name && (
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {vaccine.english_name}
                            </Text>
                          )}
                        </Space>
                      </Col>
                      <Col>
                        <Tag color={getCategoryColor(vaccine.category)}>
                          {getCategoryName(vaccine.category)}
                        </Tag>
                      </Col>
                    </Row>
                  }
                  actions={[
                    <Button 
                      type="primary" 
                      icon={<CalendarOutlined />}
                      onClick={() => handleBookAppointment(vaccine)}
                      size="small"
                    >
                      Đặt lịch tiêm
                    </Button>,
                    <Button 
                      type="default"
                      onClick={() => handleAskAboutVaccine(vaccine)}
                      size="small"
                    >
                      Hỏi AI về vaccine này
                    </Button>
                  ]}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    {/* Description */}
                    <Paragraph 
                      style={{ margin: 0, fontSize: '14px' }}
                      ellipsis={{ rows: 2, expandable: true }}
                    >
                      {vaccine.description}
                    </Paragraph>

                    <Divider style={{ margin: '8px 0' }} />

                    {/* Age Groups */}
                    <div>
                      <Text strong style={{ fontSize: '13px' }}>
                        <UserOutlined style={{ marginRight: 6, color: '#1890ff' }} />
                        Độ tuổi phù hợp:
                      </Text>
                      <div style={{ fontSize: '13px', marginTop: 4, color: '#666' }}>
                        {getAgeGroupDisplay(vaccine.age_groups)}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div>
                      <Text strong style={{ fontSize: '13px' }}>
                        <ClockCircleOutlined style={{ marginRight: 6, color: '#52c41a' }} />
                        Lịch tiêm:
                      </Text>
                      <List
                        size="small"
                        dataSource={vaccine.schedule.slice(0, 3)}
                        renderItem={(item, index) => (
                          <List.Item style={{ padding: '2px 0', fontSize: '13px', color: '#666' }}>
                            • {item}
                            {index === 2 && vaccine.schedule.length > 3 && (
                              <Text type="secondary"> (+{vaccine.schedule.length - 3} mũi khác...)</Text>
                            )}
                          </List.Item>
                        )}
                      />
                    </div>

                    {/* Price */}
                    {vaccine.price_range && (
                      <div>
                        <Text strong style={{ fontSize: '13px' }}>
                          <DollarOutlined style={{ marginRight: 6, color: '#fa8c16' }} />
                          Giá tham khảo:
                        </Text>
                        <div style={{ fontSize: '13px', marginTop: 4, color: '#666' }}>
                          {vaccine.price_range}
                        </div>
                      </div>
                    )}

                    {/* Availability */}
                    <div>
                      <Text strong style={{ fontSize: '13px' }}>
                        <MedicineBoxOutlined style={{ marginRight: 6, color: '#13c2c2' }} />
                        Tình trạng:
                      </Text>
                      <Tag 
                        color={vaccine.availability ? 'green' : 'red'} 
                        style={{ marginLeft: 8 }}
                      >
                        {vaccine.availability ? 'Có sẵn' : 'Tạm hết'}
                      </Tag>
                    </div>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Drawer>

      {/* Appointment Booking Modal */}
      <Modal
        title={
          <Space>
            <CalendarOutlined style={{ color: '#1890ff' }} />
            <span>Đặt lịch tiêm vaccine</span>
          </Space>
        }
        open={appointmentModal}
        onOk={handleSubmitAppointment}
        onCancel={() => {
          setAppointmentModal(false);
          setSelectedVaccine(null);
        }}
        width={600}
        okText="Đặt lịch"
        cancelText="Hủy"
        style={{ zIndex: 1002 }}
      >
        {selectedVaccine && (
          <Form
            form={form}
            layout="vertical"
            style={{ marginTop: 16 }}
          >
            {/* Vaccine Info */}
            <Card size="small" style={{ marginBottom: 16, backgroundColor: '#f6ffed' }}>
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Text strong>{selectedVaccine.name}</Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {selectedVaccine.description}
                </Text>
                {selectedVaccine.price_range && (
                  <Text style={{ fontSize: '12px', color: '#fa8c16' }}>
                    Giá: {selectedVaccine.price_range}
                  </Text>
                )}
              </Space>
            </Card>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Họ và tên"
                  name="full_name"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="Nguyễn Văn A" 
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                  ]}
                >
                  <Input 
                    prefix={<PhoneOutlined />} 
                    placeholder="0901234567" 
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="example@gmail.com" 
              />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Ngày hẹn"
                  name="appointment_date"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn!' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Giờ hẹn"
                  name="appointment_time"
                  rules={[{ required: true, message: 'Vui lòng chọn giờ hẹn!' }]}
                >
                  <TimePicker 
                    style={{ width: '100%' }}
                    format="HH:mm"
                    minuteStep={30}
                    disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <Input 
                prefix={<EnvironmentOutlined />} 
                placeholder="Số nhà, tên đường, quận/huyện, thành phố" 
              />
            </Form.Item>

            <Form.Item
              label="Mức độ ưu tiên"
              name="priority"
              rules={[{ required: true, message: 'Vui lòng chọn mức độ ưu tiên!' }]}
            >
              <Select>
                <Option value="normal">Bình thường</Option>
                <Option value="urgent">Khẩn cấp</Option>
                <Option value="flexible">Linh hoạt</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Ghi chú (tùy chọn)"
              name="notes"
            >
              <TextArea 
                rows={3} 
                placeholder="Triệu chứng, tiền sử bệnh, yêu cầu đặc biệt..." 
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default VaccineDrawer;