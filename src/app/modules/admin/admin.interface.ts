import { Model, Types } from 'mongoose';

//import { IBooking } from '../booking/booking.interface';
//import { IBooking } from '../booking/booking.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id?: string;
  name: UserName;
  profileImage?: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'Male' | 'Female' | 'Others';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  // eslint-disable-next-line no-undef
  managementDepartment: Types.ObjectId;
  designation: string;
  notification?: {
    message: string;
  }[];
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'Male' | 'Female' | 'Others';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: string;
  designation?: string;
};
