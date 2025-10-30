import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Snackbar,
  Fade,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Tooltip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import accountService from '../../services/accountService';
import farmService from '../../services/farmService';
import fieldService from '../../services/fieldService';
import RoleGuard from '../../components/Auth/RoleGuard';

const ROLES = ['ADMIN', 'FARMER', 'TECHNICIAN', 'FARM_OWNER'];
const LEAF_GREEN = '#81c784';
const LEAF_GREEN_LIGHT = '#a5d6a7';

const AccountManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [farms, setFarms] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'success' });
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [fieldsForSelectedFarm, setFieldsForSelectedFarm] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [accountsRes, farmsRes, fieldsRes] = await Promise.all([
        accountService.getAllAccounts(),
        farmService.getAllFarms(),
        fieldService.getAllFields(),
      ]);
      setAccounts(accountsRes.data);
      setFarms(farmsRes.data);
      setFields(fieldsRes.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Lỗi khi tải dữ liệu', color: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user) => {
    setEditingUser(user);
    setSelectedRoles(user.roles ? Array.from(user.roles) : []);
    setSelectedFarm(user.farmId || '');
    setSelectedField(user.fieldId || '');
    
    // Filter fields based on selected farm
    if (user.farmId) {
      const farmFields = fields.filter(f => f.farmId === user.farmId);
      setFieldsForSelectedFarm(farmFields);
    }
    
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    setSelectedRoles([]);
    setSelectedFarm('');
    setSelectedField('');
    setFieldsForSelectedFarm([]);
  };

  const handleFarmChange = (farmId) => {
    setSelectedFarm(farmId);
    
    // Update fields dropdown based on selected farm
    if (farmId) {
      const farmFields = fields.filter(f => f.farmId === farmId);
      setFieldsForSelectedFarm(farmFields);
    } else {
      setFieldsForSelectedFarm([]);
    }
    
    // Reset field selection if current field doesn't belong to new farm
    const currentFieldBelongsToNewFarm = fields.some(
      f => f.id === selectedField && f.farmId === farmId
    );
    if (!currentFieldBelongsToNewFarm) {
      setSelectedField('');
    }
  };

  const handleSaveAssignment = async () => {
    if (!editingUser) return;
    
    setSavingId(editingUser.id);
    try {
      const data = {
        roles: selectedRoles,
        farmId: selectedFarm || null,
        fieldId: selectedField || null,
      };
      
      await accountService.updateAccountAssignment(editingUser.id, data);
      
      // Refresh accounts list
      await fetchData();
      
      setSnackbar({ 
        open: true, 
        message: 'Phân quyền thành công!', 
        color: 'success' 
      });
      handleCloseDialog();
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: 'Lỗi khi cập nhật: ' + (error.response?.data || error.message), 
        color: 'error' 
      });
    } finally {
      setSavingId(null);
    }
  };

  const getRoleChipColor = (role) => {
    switch(role) {
      case 'ADMIN': return '#f44336';
      case 'FARM_OWNER': return '#2196f3';
      case 'FARMER': return '#4caf50';
      case 'TECHNICIAN': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <Box
        sx={{
          p: { xs: 1, md: 4 },
          background: 'linear-gradient(135deg, #e0f2f1 0%, #f5f5f5 100%)',
          minHeight: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Fade in timeout={600}>
          <Paper
            elevation={4}
            sx={{
              width: { xs: '98vw', md: '95vw', lg: '85vw' },
              maxWidth: 1400,
              height: 'auto',
              maxHeight: '90vh',
              mx: 'auto',
              my: 4,
              p: { xs: 1, md: 4 },
              borderRadius: 4,
              boxShadow: '0 8px 32px 0 rgba(67, 160, 71, 0.10)',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={3}
              color="#000"
              sx={{
                textAlign: 'center',
                letterSpacing: 1,
                textShadow: '0 2px 8px #81c78433'
              }}
            >
              🔐 Quản lý tài khoản & Phân quyền
            </Typography>
            
            <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ background: LEAF_GREEN_LIGHT }}>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Avatar</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Họ tên</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Quyền</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Trang trại</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Khu vực</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#000', fontSize: 16 }}>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <CircularProgress color="success" size={32} />
                      </TableCell>
                    </TableRow>
                  ) : accounts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Không có tài khoản nào.
                      </TableCell>
                    </TableRow>
                  ) : (
                    accounts.map(acc => (
                      <TableRow
                        key={acc.id}
                        sx={{
                          '&:hover': { background: '#c8e6c9' },
                          transition: 'background 0.2s'
                        }}
                      >
                        <TableCell>
                          <Avatar sx={{
                            bgcolor: LEAF_GREEN,
                            color: '#fff',
                            width: 40,
                            height: 40,
                            fontWeight: 700,
                            fontSize: 20,
                            boxShadow: '0 2px 8px #81c78455'
                          }}>
                            {acc.fullName ? acc.fullName.charAt(0).toUpperCase() : <PersonIcon />}
                          </Avatar>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500, fontSize: 15, color: '#000' }}>
                          {acc.fullName || '---'}
                        </TableCell>
                        <TableCell sx={{ fontSize: 15, color: '#000' }}>{acc.email}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {acc.roles && acc.roles.length > 0 ? (
                              Array.from(acc.roles).map(role => (
                                <Chip
                                  key={role}
                                  label={role}
                                  size="small"
                                  sx={{
                                    bgcolor: getRoleChipColor(role),
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: 11,
                                  }}
                                />
                              ))
                            ) : (
                              <Typography variant="caption" color="text.secondary">
                                Chưa có quyền
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, color: '#000' }}>
                          {acc.farmName || '---'}
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, color: '#000' }}>
                          {acc.fieldName || '---'}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Chỉnh sửa phân quyền">
                            <IconButton
                              onClick={() => handleOpenDialog(acc)}
                              sx={{
                                bgcolor: LEAF_GREEN,
                                color: '#fff',
                                '&:hover': { bgcolor: '#66bb6a' },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Snackbar
              open={snackbar.open}
              autoHideDuration={2500}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              ContentProps={{
                sx: {
                  background: snackbar.color === 'success' ? LEAF_GREEN : '#d32f2f',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 2,
                }
              }}
            />
          </Paper>
        </Fade>
      </Box>

      {/* Dialog phân quyền */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          bgcolor: LEAF_GREEN, 
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" fontWeight="bold">
            Phân quyền cho: {editingUser?.fullName}
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2 }}>
          {/* Email (readonly) */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Email
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {editingUser?.email}
            </Typography>
          </Box>

          {/* Roles selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Quyền</InputLabel>
            <Select
              multiple
              value={selectedRoles}
              onChange={(e) => setSelectedRoles(e.target.value)}
              input={<OutlinedInput label="Quyền" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      sx={{
                        bgcolor: getRoleChipColor(value),
                        color: '#fff',
                      }}
                    />
                  ))}
                </Box>
              )}
            >
              {ROLES.map((role) => (
                <MenuItem key={role} value={role}>
                  <Chip
                    label={role}
                    size="small"
                    sx={{
                      bgcolor: getRoleChipColor(role),
                      color: '#fff',
                      mr: 1,
                    }}
                  />
                  {role === 'ADMIN' && '- Quản trị viên'}
                  {role === 'FARM_OWNER' && '- Chủ trang trại'}
                  {role === 'FARMER' && '- Nông dân'}
                  {role === 'TECHNICIAN' && '- Kỹ thuật viên'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Farm selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Trang trại</InputLabel>
            <Select
              value={selectedFarm}
              onChange={(e) => handleFarmChange(e.target.value)}
              label="Trang trại"
            >
              <MenuItem value="">
                <em>Không gán vào trang trại nào</em>
              </MenuItem>
              {farms.map((farm) => (
                <MenuItem key={farm.id} value={farm.id}>
                  {farm.farmName} (ID: {farm.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Field selection - chỉ hiển thị fields thuộc farm đã chọn */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Khu vực</InputLabel>
            <Select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              label="Khu vực"
              disabled={!selectedFarm}
            >
              <MenuItem value="">
                <em>Không gán vào khu vực nào</em>
              </MenuItem>
              {fieldsForSelectedFarm.map((field) => (
                <MenuItem key={field.id} value={field.id}>
                  {field.fieldName} (ID: {field.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {!selectedFarm && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              ℹ️ Chọn trang trại trước để hiển thị danh sách khu vực
            </Typography>
          )}

          {/* Instructions */}
          <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              💡 Hướng dẫn phân quyền:
            </Typography>
            <Typography variant="body2" component="div">
              • <strong>FARM_OWNER</strong>: Gán trang trại, không cần chọn khu vực<br/>
              • <strong>FARMER</strong>: Gán cả trang trại VÀ khu vực<br/>
              • <strong>TECHNICIAN</strong>: Gán cả trang trại VÀ khu vực<br/>
              • <strong>ADMIN</strong>: Không cần gán trang trại/khu vực
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: '#f5f5f5' }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSaveAssignment}
            variant="contained"
            disabled={savingId === editingUser?.id}
            sx={{
              background: 'linear-gradient(90deg, #81c784 0%, #a5d6a7 100%)',
              color: '#000',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #66bb6a 0%, #81c784 100%)',
              },
            }}
          >
            {savingId === editingUser?.id ? <CircularProgress size={20} color="inherit" /> : 'Lưu phân quyền'}
          </Button>
        </DialogActions>
      </Dialog>
    </RoleGuard>
  );
};

export default AccountManager;
