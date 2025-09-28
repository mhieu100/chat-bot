import React, { useState, useEffect } from 'react';
import { Card, Tag, List, Typography, Space, Button, Select, Row, Col, Spin, Alert } from 'antd';
import { MedicineBoxOutlined, CalendarOutlined, DollarOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const VaccineRecommendations = ({ onSelectVaccine }) => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [category, setCategory] = useState(null);
  const [ageGroups, setAgeGroups] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAgeGroups();
    fetchCategories();
    fetchRecommendations();
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [ageGroup, category]);

  const fetchAgeGroups = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vaccines/age-groups`);
      const data = await response.json();
      setAgeGroups(data.age_groups);
    } catch (err) {
      console.error('Error fetching age groups:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vaccines/categories`);
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (ageGroup) params.append('age_group', ageGroup);
      if (category) params.append('category', category);

      const response = await fetch(`${API_BASE_URL}/vaccines/recommendations?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setVaccines(data.vaccines);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (cat) => {
    const colors = {
      'routine_children': 'blue',
      'routine_adults': 'green',
      'travel': 'orange',
      'occupational': 'purple',
      'special_groups': 'red'
    };
    return colors[cat] || 'default';
  };

  const getAgeGroupDisplay = (ageGroups) => {
    const displayMap = {
      'infant': '👶 Sơ sinh',
      'child': '🧒 Trẻ em',
      'teen': '🧑‍🎓 Thiếu niên',
      'adult': '👨‍💼 Người lớn',
      'senior': '👴 Cao tuổi',
      'all_ages': '👥 Mọi lứa tuổi'
    };
    
    return ageGroups.map(age => displayMap[age] || age).join(', ');
  };

  const handleAskAboutVaccine = (vaccine) => {
    if (onSelectVaccine) {
      const question = `Hãy cho tôi biết chi tiết về vaccine ${vaccine.name} (${vaccine.english_name})`;
      onSelectVaccine(question);
    }
  };

  const clearFilters = () => {
    setAgeGroup(null);
    setCategory(null);
  };

  return (
    <div style={{ padding: '16px' }}>
      <Title level={3}>
        <MedicineBoxOutlined style={{ color: '#1890ff', marginRight: 8 }} />
        Gợi ý Vaccine phù hợp
      </Title>

      {/* Filters */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Text strong>Nhóm tuổi:</Text>
          <Select
            style={{ width: '100%', marginTop: 4 }}
            placeholder="Chọn nhóm tuổi"
            value={ageGroup}
            onChange={setAgeGroup}
            allowClear
          >
            {ageGroups.map(group => (
              <Option key={group.value} value={group.value}>
                {group.label}
              </Option>
            ))}
          </Select>
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Text strong>Danh mục:</Text>
          <Select
            style={{ width: '100%', marginTop: 4 }}
            placeholder="Chọn danh mục"
            value={category}
            onChange={setCategory}
            allowClear
          >
            {categories.map(cat => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <div style={{ paddingTop: 24 }}>
            <Button onClick={clearFilters} style={{ marginRight: 8 }}>
              Xóa bộ lọc
            </Button>
            <Button type="primary" onClick={fetchRecommendations}>
              Làm mới
            </Button>
          </div>
        </Col>
      </Row>

      {/* Results */}
      {error && (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Đang tải thông tin vaccine...</div>
        </div>
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={vaccines}
          renderItem={(vaccine) => (
            <List.Item>
              <Card
                hoverable
                size="small"
                title={
                  <Space direction="vertical" size={0}>
                    <Text strong>{vaccine.name}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {vaccine.english_name}
                    </Text>
                  </Space>
                }
                extra={
                  <Tag color={getCategoryColor(vaccine.category)}>
                    {vaccine.category.replace('_', ' ')}
                  </Tag>
                }
                actions={[
                  <Button 
                    type="link" 
                    size="small"
                    onClick={() => handleAskAboutVaccine(vaccine)}
                  >
                    Hỏi về vaccine này
                  </Button>
                ]}
              >
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <Paragraph 
                    style={{ margin: 0, fontSize: '13px' }} 
                    ellipsis={{ rows: 2 }}
                  >
                    {vaccine.description}
                  </Paragraph>

                  <div>
                    <Text strong style={{ fontSize: '12px' }}>
                      <CalendarOutlined style={{ marginRight: 4 }} />
                      Độ tuổi:
                    </Text>
                    <div style={{ fontSize: '12px', marginTop: 2 }}>
                      {getAgeGroupDisplay(vaccine.age_groups)}
                    </div>
                  </div>

                  {vaccine.price_range && (
                    <div>
                      <Text strong style={{ fontSize: '12px' }}>
                        <DollarOutlined style={{ marginRight: 4 }} />
                        Giá:
                      </Text>
                      <div style={{ fontSize: '12px', marginTop: 2 }}>
                        {vaccine.price_range}
                      </div>
                    </div>
                  )}

                  <div>
                    <Text strong style={{ fontSize: '12px' }}>
                      <ExclamationCircleOutlined style={{ marginRight: 4 }} />
                      Lịch tiêm:
                    </Text>
                    <List
                      size="small"
                      dataSource={vaccine.schedule.slice(0, 2)}
                      renderItem={(item, index) => (
                        <List.Item style={{ padding: '2px 0', fontSize: '12px' }}>
                          • {item}
                          {index === 1 && vaccine.schedule.length > 2 && (
                            <Text type="secondary"> (+{vaccine.schedule.length - 2} mũi khác...)</Text>
                          )}
                        </List.Item>
                      )}
                    />
                  </div>

                  {!vaccine.availability && (
                    <Tag color="red" style={{ marginTop: 4 }}>
                      Hiện tại không có sẵn
                    </Tag>
                  )}
                </Space>
              </Card>
            </List.Item>
          )}
        />
      )}

      {vaccines.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <MedicineBoxOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
          <div style={{ marginTop: 16, fontSize: '16px', color: '#999' }}>
            Không tìm thấy vaccine phù hợp với bộ lọc hiện tại
          </div>
          <Button type="link" onClick={clearFilters} style={{ marginTop: 8 }}>
            Xóa bộ lọc để xem tất cả
          </Button>
        </div>
      )}
    </div>
  );
};

export default VaccineRecommendations;