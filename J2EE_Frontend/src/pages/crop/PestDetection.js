import React, { useState, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  LinearProgress,
  Divider,
  IconButton,
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  BugReport,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';
import pestDiseaseService from '../../services/pestDiseaseService';

/**
 * Component Phát hiện Sâu bệnh trên cây trồng
 */
const PestDetection = () => {
  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [classes, setClasses] = useState([]);

  const fileInputRef = useRef(null);

  // Load danh sách bệnh khi component mount
  React.useEffect(() => {
    loadDiseaseClasses();
  }, []);

  const loadDiseaseClasses = async () => {
    try {
      const response = await pestDiseaseService.getDiseaseClasses();
      if (response.success) {
        setClasses(response.classes);
      }
    } catch (err) {
      console.error('Error loading disease classes:', err);
    }
  };

  // Handle chọn ảnh
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chọn file ảnh (jpg, png, etc.)');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Kích thước ảnh không được vượt quá 10MB');
        return;
      }

      setSelectedImage(file);
      setError('');
      setResult(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle phát hiện bệnh
  const handleDetect = async () => {
    if (!selectedImage) {
      setError('Vui lòng chọn ảnh trước');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await pestDiseaseService.detectDisease(selectedImage);
      setResult(response);
    } catch (err) {
      setError(err.message || 'Lỗi khi phát hiện bệnh');
    } finally {
      setLoading(false);
    }
  };

  // Handle xóa ảnh
  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get severity icon and color
  const getSeverityInfo = (disease) => {
    // Tất cả 4 loại đều là sâu bệnh, không có "Healthy"
    return { icon: <Warning />, color: 'error' };
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BugReport sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Phát hiện Sâu bệnh Cây trồng
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Tải lên ảnh cây trồng để phát hiện sâu bệnh bằng AI. Hệ thống sẽ phân tích và
          đưa ra chẩn đoán với độ tin cậy.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>💡 Tips để có kết quả tốt nhất:</strong>
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            • Chụp ảnh rõ nét, tập trung vào lá cây
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            • Đảm bảo ánh sáng đủ, tránh ảnh quá tối
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            • Chụp nhiều góc độ khác nhau để so sánh
          </Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            • Nếu kết quả không chắc chắn, hãy tham khảo chuyên gia
          </Typography>
        </Alert>

        <Divider sx={{ mb: 4 }} />

        {/* Upload Section */}
        <Grid container spacing={4}>
          {/* Left: Upload & Preview */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  1. Chọn ảnh cây trồng
                </Typography>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageSelect}
                />

                <Button
                  variant="contained"
                  startIcon={<CloudUpload />}
                  onClick={() => fileInputRef.current.click()}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Chọn ảnh
                </Button>

                {imagePreview && (
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={imagePreview}
                      alt="Preview"
                      sx={{
                        maxHeight: 400,
                        objectFit: 'contain',
                        border: '2px solid #e0e0e0',
                        borderRadius: 2,
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                      }}
                      onClick={handleClear}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                )}

                {selectedImage && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tên file: {selectedImage.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Kích thước: {(selectedImage.size / 1024).toFixed(2)} KB
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Detect Button */}
            {selectedImage && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleDetect}
                disabled={loading}
                sx={{ mt: 2 }}
                startIcon={loading ? <CircularProgress size={20} /> : <BugReport />}
              >
                {loading ? 'Đang phân tích...' : 'Phát hiện Sâu bệnh'}
              </Button>
            )}
          </Grid>

          {/* Right: Results */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h6">
                    2. Kết quả phân tích
                  </Typography>
                  {result && result.success && (
                    <Chip 
                      label={result.confidence > 0.95 ? "Độ tin cậy cao" : "Cần xem xét thêm"} 
                      color={result.confidence > 0.95 ? "success" : "warning"}
                      size="small"
                    />
                  )}
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {loading && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress size={60} />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Đang phân tích ảnh...
                    </Typography>
                  </Box>
                )}

                {result && result.success && (
                  <Box>
                    {/* Confidence Warning */}
                    {result.confidence < 0.95 && (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="bold">
                          ⚠️ Độ tin cậy thấp ({(result.confidence * 100).toFixed(1)}%)
                        </Typography>
                        <Typography variant="body2">
                          Model không hoàn toàn chắc chắn. Vui lòng kiểm tra các dự đoán khác bên dưới.
                        </Typography>
                      </Alert>
                    )}

                    {/* Main Result */}
                    <Alert
                      severity={
                        result.disease === 'Khỏe mạnh' 
                          ? (result.confidence > 0.95 ? 'success' : 'info')
                          : 'error'
                      }
                      icon={getSeverityInfo(result.disease).icon}
                      sx={{ mb: 3 }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {result.disease}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {result.disease_en}
                      </Typography>
                      <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight="bold">
                          Độ tin cậy:
                        </Typography>
                        <Chip
                          label={`${(result.confidence * 100).toFixed(1)}%`}
                          color={result.confidence > 0.95 ? 'success' : result.confidence > 0.7 ? 'warning' : 'error'}
                          size="small"
                        />
                      </Box>
                    </Alert>

                    {/* All Predictions */}
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
                      📊 Chi tiết tất cả dự đoán:
                    </Typography>

                    {result.all_predictions &&
                      result.all_predictions.map((prediction, index) => {
                        const isTop = index === 0;
                        const isSignificant = prediction.probability > 0.1;
                        
                        return (
                          <Box 
                            key={index} 
                            sx={{ 
                              mb: 2.5,
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: isTop ? 'action.selected' : 'transparent',
                              border: isTop ? '2px solid' : '1px solid',
                              borderColor: isTop ? 'primary.main' : 'divider',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1,
                              }}
                            >
                              <Box>
                                <Typography 
                                  variant="body1" 
                                  fontWeight={isTop ? 'bold' : 'medium'}
                                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                >
                                  {isTop && '🏆'} {prediction.class_name_vi}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {prediction.class_name_en}
                                </Typography>
                              </Box>
                              
                              <Chip
                                label={`${(prediction.probability * 100).toFixed(1)}%`}
                                size="small"
                                color={
                                  isTop ? 'primary' : 
                                  isSignificant ? 'warning' : 
                                  'default'
                                }
                                sx={{ fontWeight: 'bold' }}
                              />
                            </Box>
                            
                            <LinearProgress
                              variant="determinate"
                              value={prediction.probability * 100}
                              sx={{ 
                                height: 10, 
                                borderRadius: 5,
                                bgcolor: 'action.hover',
                              }}
                              color={
                                isTop ? 'primary' : 
                                isSignificant ? 'warning' : 
                                'inherit'
                              }
                            />
                            
                            {isSignificant && !isTop && (
                              <Typography 
                                variant="caption" 
                                color="warning.main" 
                                sx={{ mt: 0.5, display: 'block' }}
                              >
                                ⚠️ Xác suất đáng kể - cần xem xét thêm
                              </Typography>
                            )}
                          </Box>
                        );
                      })}

                    {/* Recommendations - Tất cả đều là sâu bệnh */}
                    <Alert severity="error" icon={<Warning />} sx={{ mt: 3 }}>
                      <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                        🚨 Phát hiện sâu bệnh: {result.disease}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                        💡 Khuyến nghị xử lý:
                      </Typography>
                      
                      {/* Khuyến nghị theo loại bệnh */}
                      {result.disease_en === 'Aphid' && (
                        <>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Sử dụng thuốc trừ sâu sinh học hoặc hóa học chuyên dụng
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Loại bỏ cây bị nhiễm nặng
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Sử dụng bẫy dính màu vàng
                          </Typography>
                        </>
                      )}
                      
                      {result.disease_en === 'Blast' && (
                        <>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Phun thuốc fungicide chuyên trị bệnh đạo ôn
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Cải thiện thoát nước, tránh úng
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Cắt bỏ phần bị bệnh và tiêu hủy
                          </Typography>
                        </>
                      )}
                      
                      {result.disease_en === 'Smut' && (
                        <>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Xử lý hạt giống bằng thuốc fungicide
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Loại bỏ cây bị bệnh trước khi nấm lan rộng
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Luân canh cây trồng
                          </Typography>
                        </>
                      )}
                      
                      {result.disease_en === 'Septoria' && (
                        <>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Phun fungicide chống nấm Septoria
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Loại bỏ lá bị đốm và tàn dư cây
                          </Typography>
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            • Tăng cường thoát khí, giảm độ ẩm
                          </Typography>
                        </>
                      )}
                      
                      <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
                        • Liên hệ chuyên gia nông nghiệp để xác nhận
                      </Typography>
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        • Kiểm tra và xử lý các cây xung quanh
                      </Typography>
                      
                      {result.confidence < 0.7 && (
                        <Typography variant="body2" sx={{ mt: 2, color: 'warning.main' }}>
                          ⚠️ Độ tin cậy thấp ({(result.confidence * 100).toFixed(1)}%). 
                          Khuyến nghị chụp ảnh rõ hơn hoặc tham khảo chuyên gia.
                        </Typography>
                      )}
                    </Alert>
                  </Box>
                )}

                {!loading && !result && !error && (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <BugReport sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                    <Typography variant="body1">
                      Chọn ảnh và nhấn "Phát hiện Sâu bệnh" để bắt đầu
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Disease Classes Info */}
        {classes.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Hệ thống có thể phát hiện {classes.length} loại:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {classes.map((cls) => (
                <Chip
                  key={cls.class_id}
                  label={`${cls.name_vi} (${cls.name_en})`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PestDetection;

