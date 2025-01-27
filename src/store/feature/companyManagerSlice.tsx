import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanyManagementProfile } from "../../models/ICompanyManagementProfile";
import apis from "../../constant/RestApis";
import { IBaseResponse } from "../../models/IBaseResponse";
import { ICompanyManagerUpdateRequest } from "../../models/ICompanyManagerUpdateRequest";
import { ICompanyPersonelResponse } from "../../models/ICompanyPersonelResponse";
import { INewPersonelRequest } from "../../models/INewPersonelRequest";
import { IPersonelUpdateStateRequest } from "../../models/IPersonelUpdateStateRequest";
import { IPersonelUpcomingBirthdayListResponse } from "../../models/IPersonelUpcomingBirthdayListResponse";
import { ICompanyManagerHome } from "../../models/CompanyManagerHome";


interface ICompanyManagerState {
    isCompanyManagementProfileLoading: boolean,
    companyManagementProfile: ICompanyManagementProfile | null,
    isCompanyLogoLoading: boolean,
    isCompanyManagementUpdateProfileLoading: boolean,
    isCompanyPersonelListLoading: boolean, 
    companyPersonelList: ICompanyPersonelResponse[],
    isNewPersonelLoading: boolean,
    isUpdatePersonelStateLoading: boolean,
    isPersonelUpcomingBirthdayListLoading: boolean,
    personelBirthdayList: IPersonelUpcomingBirthdayListResponse[],
    chartList: ICompanyManagerHome | null,
    isChartListLoading: boolean,
    isCompanyManagerAccountPassiveLoading: boolean
}

const initialCompanyManagerState: ICompanyManagerState = {
    isCompanyManagementProfileLoading: false,
    companyManagementProfile: null,
    isCompanyLogoLoading: false,
    isCompanyManagementUpdateProfileLoading: false,
    isCompanyPersonelListLoading: false,
    companyPersonelList: [],
    isNewPersonelLoading: false,
    isUpdatePersonelStateLoading: false,
    isPersonelUpcomingBirthdayListLoading: false,
    personelBirthdayList: [],
    chartList: null,
    isChartListLoading: false,
    isCompanyManagerAccountPassiveLoading: false
}


//fetch işlemleri

//Şirket Yöneticisinin Tüm Bilgilerini Getirir.
export const fetchGetCompanyManagerProfileByToken = createAsyncThunk(
    'companyManagement/fetchGetCompanyManagerProfileByToken',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + '/get-company-manager-profile?token=' + token,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => data.json());
    }
)


//şirket logosu eklemek için kullanılıyor.
export const fetchAddLogoToCompany = createAsyncThunk(
    'companyManagement/fetchAddLogoToCompany',
    async (file: File) => {
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append("token", token);
        formData.append("file", file);

        const response = await fetch(apis.companyManagementService + '/update-company-logo', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
        return response;
    }
)

//Şirket Yöneticisi Bilgilerini Güncelleme Metodu
export const fetchUpdateCompanyManagerProfile = createAsyncThunk(
    'companyManagement/fetchUpdateCompanyManagerProfile',
    async (payload: ICompanyManagerUpdateRequest) => {
        const token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + "/update-company-manager-profile", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//şirkete ait personelleri listeler.
export const fetchGetPersonelList = createAsyncThunk(
    'companyManagemet/fetchGetPersonelList',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + '/get-personel-list?token=' + token,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        .then(data => data.json());
    }
)

//şirkete ait personel ekler.
export const fetchAddNewPersonel = createAsyncThunk(
    'companyManagemet/fetchAddNewPersonel',
    async (payload: INewPersonelRequest) => {
        const  token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + '/add-personel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//şirkete ait personelin aktiflik pasiflik durumunu günceller.
export const fetchUpdatePersonelState = createAsyncThunk(
    'companyManagement/fetchUpdatePersonelState',
    async (payload: IPersonelUpdateStateRequest) => {
        const token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + '/update-personel-state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }).then(data => data.json())
    }
)

//Şirkete ait personellerin yaklaşan doğum günü listesini getirir.
export const fetchGetUpcomingBirthdays = createAsyncThunk(
    'companyManagement/fetchGetUpcomingBirthdays',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + '/upcoming-birthdays?token=' + token, {
            method: 'GET',
            headers: {
                 'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)


export const fetchGetCharts = createAsyncThunk(
    'companyManagement/fetchGetCharts   ',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + '/get-charts?token=' + token, {
            method: 'GET',
            headers: {
                 'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
    }
)


export const fetchSetCompanyPassive = createAsyncThunk(
    'comapanyManagement/fetchSetCompanyPassive',
    async () => {
        const token = localStorage.getItem('token');
        return await fetch(apis.companyManagementService + '/set-company-passive?token=' + token, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
           }
        }).then(data => data.json());
    }
)

const companyManagementSlice = createSlice({
    name: 'companyManagement',
    initialState: initialCompanyManagerState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchGetCompanyManagerProfileByToken.pending, (state) => {
            state.isCompanyManagementProfileLoading = true;
        })
        build.addCase(fetchGetCompanyManagerProfileByToken.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isCompanyManagementProfileLoading = false;
            if (action.payload.code === 200) {
                state.companyManagementProfile = action.payload.data;
            }
        })
        build.addCase(fetchAddLogoToCompany.pending, (state) => {
            state.isCompanyLogoLoading = true;
        })
        build.addCase(fetchAddLogoToCompany.fulfilled, (state) => {
            state.isCompanyLogoLoading = false;
        })
        build.addCase(fetchUpdateCompanyManagerProfile.pending, (state) => {
            state.isCompanyManagementUpdateProfileLoading = true;
        })
        build.addCase(fetchUpdateCompanyManagerProfile.fulfilled, (state, action) => {
            state.isCompanyManagementUpdateProfileLoading = false;
        })
        build.addCase(fetchGetPersonelList.pending, (state) => {
            state.isCompanyPersonelListLoading = true;
        })
        build.addCase(fetchGetPersonelList.fulfilled, (state, action: PayloadAction<IBaseResponse>) => {
            state.isCompanyPersonelListLoading = false;
           
            if(action.payload.code === 200) {
                state.companyPersonelList = action.payload.data;
            }
        })
        build.addCase(fetchAddNewPersonel.pending, (state) => {
            state.isNewPersonelLoading = true;
        })
        build.addCase(fetchAddNewPersonel.fulfilled, (state) => {
            state.isNewPersonelLoading = false;
        })
        build.addCase(fetchUpdatePersonelState.pending, (state) => {
            state.isUpdatePersonelStateLoading = true;
        })
        build.addCase(fetchUpdatePersonelState.fulfilled, (state) => {
            state.isUpdatePersonelStateLoading = false;
        })
        build.addCase(fetchGetUpcomingBirthdays.pending, (state) => {
            state.isPersonelUpcomingBirthdayListLoading = true;
        })
        build.addCase(fetchGetUpcomingBirthdays.fulfilled, (state, action) => {
            state.isPersonelUpcomingBirthdayListLoading = false;
            if(action.payload.code === 200){
                state.personelBirthdayList = action.payload.data;
            }
        })
        build.addCase(fetchGetCharts.pending,state=>{state.isChartListLoading=true})
        build.addCase(fetchGetCharts.fulfilled,(state,action: PayloadAction<IBaseResponse>)=>{
            state.isChartListLoading = false;
            if(action.payload.code===200){
                state.chartList = action.payload.data;
            }
        })
        build.addCase(fetchSetCompanyPassive.pending, (state) => {
            state.isCompanyManagerAccountPassiveLoading = true;
        })
        build.addCase(fetchSetCompanyPassive.fulfilled, (state) => {
            state.isCompanyManagerAccountPassiveLoading = false;
        })
    }
})

export default companyManagementSlice.reducer;
