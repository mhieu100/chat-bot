import React from 'react';
import { Card, Button, Space, Typography, Row, Col } from 'antd';
import {
  MedicineBoxOutlined,
  DollarOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
  QuestionCircleOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const QuickActionMenu = ({ onActionClick, visible = false }) => {
  if (!visible) return null;

  const quickActions = [
    {
      key: 'recommend',
      title: '💉 Tư vấn vaccine',
      description: 'Gợi ý vaccine phù hợp với bạn',
      icon: <MedicineBoxOutlined />,
      color: '#52c41a',
      message: 'Tôi muốn được tư vấn vaccine phù hợp'
    },
    {
      key: 'cost',
      title: '💰 Chi phí tiêm',
      description: 'Xem giá vaccine và so sánh',
      icon: <DollarOutlined />,
      color: '#fa8c16',
      message: 'Chi phí tiêm vaccine bao nhiêu?'
    },
    {
      key: 'schedule',
      title: '📅 Lịch tiêm',
      description: 'Lên lịch trình tiêm chủng',
      icon: <CalendarOutlined />,
      color: '#1890ff',
      message: 'Tôi muốn xem lịch tiêm chủng'
    },
    {
      key: 'safety',
      title: '🛡️ An toàn vaccine',
      description: 'Thông tin về tác dụng phụ',
      icon: <SafetyCertificateOutlined />,
      color: '#722ed1',
      message: 'Vaccine có an toàn không?'
    },
    {
      key: 'location',
      title: '📍 Địa điểm tiêm',
      description: 'Tìm trung tâm y tế gần bạn',
      icon: <EnvironmentOutlined />,
      color: '#eb2f96',
      message: 'Tiêm vaccine ở đâu?'
    },
    {
      key: 'compare',
      title: '📊 So sánh vaccine',
      description: 'So sánh các loại vaccine',
      icon: <BarChartOutlined />,
      color: '#13c2c2',
      message: 'So sánh các loại vaccine cho tôi'
    }
  ];

  return (
    <div style={{
      padding: '16px 0',
      background: 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)',
      borderRadius: '12px',
      margin: '8px 0',
      border: '1px solid #e6f7ff'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Title level={5} style={{ margin: '0 0 4px 0', color: '#135200' }}>
          🤖 Trợ lý AI có thể giúp bạn
        </Title>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          Chọn chủ đề bạn quan tâm
        </Text>
      </div>
      
      <Row gutter={[8, 8]} justify="center">
        {quickActions.map((action) => (
          <Col xs={12} sm={8} md={6} key={action.key}>
            <Card
              hoverable
              size="small"
              style={{
                textAlign: 'center',
                borderRadius: '8px',
                border: `1px solid ${action.color}20`,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              bodyStyle={{
                padding: '12px 8px',
              }}
              onClick={() => onActionClick(action.message)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${action.color}30`;
                e.currentTarget.style.borderColor = action.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${action.color}20`;
              }}
            >
              <div style={{
                fontSize: '24px',
                color: action.color,
                marginBottom: '4px'
              }}>
                {action.icon}
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#262626',
                marginBottom: '2px',
                lineHeight: '1.2'
              }}>
                {action.title}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#8c8c8c',
                lineHeight: '1.2'
              }}>
                {action.description}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '12px',
        padding: '8px'
      }}>
        <Button
          type="link"
          size="small"
          icon={<QuestionCircleOutlined />}
          onClick={() => onActionClick('Tôi có câu hỏi khác')}
          style={{ 
            color: '#666',
            fontSize: '11px'
          }}
        >
          Hoặc đặt câu hỏi tự do
        </Button>
      </div>
    </div>
  );
};

export default QuickActionMenu;