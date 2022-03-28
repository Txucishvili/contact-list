import api from './axios';

 class ContactsService {
    getAll() {
        return api.get("/api/Persons.json");
    }

    getContact(key) {
        return api.get(`/api/Person-${key}.json`);
    }

    fetchGenders() {
        return api.get("/api/enums/GenderEnum.json");
    }
    
    fetchCities() {
        return api.get("/api/Cities.json");
    }
    
    fetchVillages() {
        return api.get("/api/Villages.json");
    }


    fetchPhoneTypeEnums() {
        return api.get('/api/enums/GetPhoneTypeEnum.json')
    }
    
    fetchPhoneIndexs(param) {
        return api.get(`/api/GetPhoneIndex_${param}.json`)
    }
}

export default new ContactsService;