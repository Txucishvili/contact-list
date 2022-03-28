<script>
import ContactsService from "@/services/ContactsService";
import ContactList from "@/components/Contacts/ContactList.vue";
import Modal from "@/components/Modal/Modal.vue";
import ContactForm from "@/components/ContactForm.vue";
import { reactive, ref } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const convertToDateInput = function (date) {
  var local = new Date(date);
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

const getCurrentDay = function () {
  return convertToDateInput(new Date());
};

const InitialFormModelFilled = {
  FirstName: "john",
  LastName: "doe",
  PrivateNumber: "12345678901",
  BirthDate: getCurrentDay(),
  EmailAddress: "email@ge.ge",
  GenderId: "3578e1b5-da32-4224-8698-2eae12248a92",
  PhoneModels: [
    {
      PhoneIndexId: "b612e82f-1b9d-4195-a513-4094384a0564",
      PhoneNumber: "111111",
      TypeId: "6cff7ae9-82cc-43a7-9689-316553365e2c",
    },
    {
      PhoneIndexId: "4e783f6c-068d-4bcb-8cb6-7eb96917a10c",
      PhoneNumber: "222222",
      TypeId: "e45f7317-78fa-4cee-bbda-5cddd5b1e5a9",
    },
    {
      PhoneIndexId: "b612e82f-1b9d-4195-a513-4094384a0564",
      PhoneNumber: "333333",
      TypeId: "6cff7ae9-82cc-43a7-9689-316553365e2c",
    },
    {
      PhoneIndexId: "b612e82f-1b9d-4195-a513-4094384a0564",
      PhoneNumber: "444444",
      TypeId: "6cff7ae9-82cc-43a7-9689-316553365e2c",
    },
  ],
  AddressCreateModels: [
    {
      CityId: "d08385cc-cb96-4222-b247-01a4c94a59d5",
      VillageId: "",
      DetailedAddress: "asd",
    },
  ],
};
const InitialFormModel = {
  FirstName: "",
  LastName: "",
  PrivateNumber: "",
  BirthDate: "",
  EmailAddress: "",
  GenderId: "",
  PhoneModels: [
    {
      PhoneIndexId: "",
      PhoneNumber: "",
      TypeId: "",
    },
  ],
  AddressCreateModels: [
    {
      CityId: "",
      VillageId: "",
      DetailedAddress: "",
    },
  ],
};

export default {
  inject: ["store"],
  components: { ContactList, Modal, ContactForm },
  _InitialForm: {
    FirstName: "",
    LastName: "",
    PrivateNumber: "",
    BirthDate: "",
    EmailAddress: "",
    GenderId: "",
    PhoneModels: [
      {
        PhoneIndexId: "",
        PhoneNumber: "",
        TypeId: "",
      },
    ],
    AddressCreateModels: [
      {
        CityId: "",
        VillageId: "",
        DetailedAddress: "",
      },
    ],
  },
  data() {
    return {
      modals: {
        addContact: false,
      },

      contactsListState: {
        isLoading: false,
        isLoaded: false,
        data: [],
        errors: [],
      },

      cityListState: {
        isLoading: false,
        isLoaded: false,
        data: [],
        errors: [],
      },
      villageListState: {
        isLoading: false,
        isLoaded: false,
        data: [],
        errors: [],
      },
      phoneTypeEnumsState: {
        isLoading: false,
        isLoaded: false,
        data: [],
        errors: [],
      },
      phoneIndexsState: {
        isLoading: false,
        isLoaded: false,
        data: [],
        errors: [],
      },
      genderEnumsState: {
        isLoading: false,
        isLoaded: false,
        data: [],
        errors: [],
      },

      livingAreaList: {
        isLoading: false,
        isLoaded: false,
        data: [],
        errors: {},
      },

      livingAreaTypeEnums: [
        { id: 0, key: "CityId", name: "City" },
        { id: 1, key: "VillageId", name: "Village" },
      ],

      activeLivingAreaType: ref(0),

      EditModalData: {},
      phoneIndexScheme: {
        isLoading: false,
        isLoaded: false,
        data: {},
        errors: {},
      },

      editTargetModelIndex: null,
    };
  },
  _InitialForm: {
    model: {},
  },
  setup() {
    return { v$: useVuelidate() };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      async () => {
        // this.modals.addContact = true;
        this.setPersons();
      },
      { immediate: true }
    );
  },
  computed: {},
  watch: {},
  async mounted() {
  },
  async checkPrefetch(fn) {
    return new Promise(async (r) => {
      if (this.isLoading || this.isLoaded) {
        // this.errors = {};
        r();
        return;
      }

      this.isLoading = true;

      if (
        this.data instanceof Object ||
        (this.data instanceof Array && !this.data.length)
      ) {
        await fn()
          .then((e) => {
            this.data = e;
            this.errors = {};
            this.isLoaded = true;
          })
          .catch((err) => {
            console.log("Error on fetch data");
            this.errors = { error: true };
            this.isLoaded = false;
          });

        setTimeout(() => {
          this.isLoading = false;
          r();
          return;
        }, 1000);

        return;
      }

      await setTimeout(() => {
        this.isLoading = false;
        r();
      }, 1000);
    });
  },
  methods: {
    setPersons() {
      this.$options.checkPrefetch.call(this.contactsListState, this.getPersons);
    },
    getPersons() {
      return ContactsService.getAll().then((r) => {
        const _contacts = r.data.data.filter((r) => r.phoneModels.length);
        _contacts[0] = {
          id: "cd94b65c-4c10-42a3-a241-011a592af0c8",
          firstname: "users name",
          lastname: "სერვის ცენტრი 2",
          privateNumber: "99999999999",
          birthDate: "1988-12-20T00:00:00",
          emailAddress: "oto@service.com",
          genderId: "a921119c-8154-4bf2-9c44-4525f5bd4982",
          gender: "მამრობითი",
          legalId: null,
          isActive: true,
          legalGetModel: null,
          addressGetModels: [],
          phoneModels: [
            {
              id: "bcb47c31-72f8-4161-4bbc-08d967c2db33",
              personId: "cd94b65c-4c10-42a3-a241-011a592af0c8",
              phoneIndexId: "b612e82f-1b9d-4195-a513-4094384a0564",
              phoneNumber: "000000",
              typeId: "6cff7ae9-82cc-43a7-9689-316553365e2c",
              phoneType: "მობილური ტელეფონი",
              phoneIndexGetModel: {
                id: "b612e82f-1b9d-4195-a513-4094384a0564",
                typeId: "23c886bb-7950-47c4-be1e-ce65051fc98d",
                phoneIndexType: "მობილური ოპერატორის ინდექსი",
                cityId: null,
                index: "555",
                parentId: null,
                isActive: true,
                applicationUserGetModel: null,
              },
              personGetModelForPhone: {
                id: "cd94b65c-4c10-42a3-a241-011a592af0c8",
                firstname: "ოთო",
                lastname: "სერვის ცენტრი 2",
                privateNumber: "99999999999",
                birthDate: "1988-12-20T00:00:00",
                emailAddress: "oto@service.com",
                genderId: "a921119c-8154-4bf2-9c44-4525f5bd4982",
                gender: "მამრობითი",
                legalId: null,
                isActive: true,
                legalGetModel: null,
                addressGetModels: null,
                applicationUserGetModel: {
                  userName: "Zura",
                  email: "Zura@mail.com",
                },
              },
              applicationUserGetModel: {
                userName: "Zura",
                email: "Zura@mail.com",
              },
            },
            {
              id: "bcb47c31-72f8-4161-4bbc-08d967c2db33",
              personId: "cd94b65c-4c10-42a3-a241-011a592af0c8",
              phoneIndexId: "4e783f6c-068d-4bcb-8cb6-7eb96917a10c",
              phoneNumber: "111111",
              typeId: "e45f7317-78fa-4cee-bbda-5cddd5b1e5a9",
              phoneType: "ქალაქის ტელეფონი",
              phoneIndexGetModel: {
                id: "b612e82f-1b9d-4195-a513-4094384a0564",
                typeId: "23c886bb-7950-47c4-be1e-ce65051fc98d",
                phoneIndexType: "მობილური ოპერატორის ინდექსი",
                cityId: null,
                index: "555",
                parentId: null,
                isActive: true,
                applicationUserGetModel: null,
              },
              personGetModelForPhone: {
                id: "cd94b65c-4c10-42a3-a241-011a592af0c8",
                firstname: "ოთო",
                lastname: "სერვის ცენტრი 2",
                privateNumber: "99999999999",
                birthDate: "1988-12-20T00:00:00",
                emailAddress: "oto@service.com",
                genderId: "a921119c-8154-4bf2-9c44-4525f5bd4982",
                gender: "მამრობითი",
                legalId: null,
                isActive: true,
                legalGetModel: null,
                addressGetModels: null,
                applicationUserGetModel: {
                  userName: "Zura",
                  email: "Zura@mail.com",
                },
              },
              applicationUserGetModel: {
                userName: "Zura",
                email: "Zura@mail.com",
              },
            },
          ],
          applicationUserGetModel: { userName: "Zura", email: "Zura@mail.com" },
        };

        return _contacts;
      });
    },
    getGenderType() {
      return ContactsService.fetchGenders().then((r) => {
        return r.data;
      });
    },
    getPhoneTypes() {
      return ContactsService.fetchPhoneTypeEnums().then((r) => {
        return r.data;
      });
    },
    getPhoneIndexs(key) {
      return ContactsService.fetchPhoneIndexs(key).then((resp) => {
        return resp.data;
      });
    },
    getCities() {
      return ContactsService.fetchCities().then((resp) => {
        return resp.data;
      });
    },
    getVillages() {
      return ContactsService.fetchVillages().then((resp) => {
        return resp.data;
      });
    },
    async _setInitialPreRequest(phoneIndexRequest) {
      this.$options.checkPrefetch.call(
        this.genderEnumsState,
        this.getGenderType
      );

      this.setLivingAreas(this.activeLivingAreaType);
      this.setPhoneIndexs(phoneIndexRequest);

      // this.$options.checkPrefetch.call(
      //   this.phoneIndexScheme,
      //   this.getPhoneTypes
      // );
    },
    async setPhoneIndexs(types) {
      let obj = {};

      if (!this.phoneIndexScheme.isLoaded) {
        try {
          const loadData = await this.getPhoneTypes();

          if (!loadData) {
            return;
          }

          loadData.forEach((e) => {
            obj[e.id] = {
              ...e,
              indexs: [],
            };
          });

          this.phoneIndexScheme.isLoaded = true;
          this.phoneIndexScheme.errors = {};
          this.phoneIndexScheme.data = obj;
        } catch (error) {
          this.phoneIndexScheme.isLoaded = false;
          this.phoneIndexScheme.errors = { error: "Phone type fetch" };
        }
      }

      types.forEach(async (e, i) => {
        await this.onPhoneTypeChange(e);
      });
    },
    async setLivingAreas(id) {
      const currentType = this.livingAreaTypeEnums.find((_e) => _e.id == id);
      let list = [];
      let errors = {};
      this.livingAreaList.isLoading = true;

      switch (currentType.name) {
        case "City":
          await this.$options.checkPrefetch.call(
            this.cityListState,
            this.getCities
          );

          list = this.cityListState.data.data;
          errors = this.cityListState.errors;

          break;
        case "Village":
          await this.$options.checkPrefetch.call(
            this.villageListState,
            this.getVillages
          );
          list = this.villageListState.data.data;
          errors = this.villageListState.errors;
          break;
        default:
          break;
      }
      this.livingAreaList.data = list;
      this.livingAreaList.isLoading = false;
      this.livingAreaList.errors = errors;
    },
    async openAddModal() {
      console.log("[Opening AddContacts modal]");
      this.modals.addContact = true;
      this.$options._InitialForm.model = InitialFormModel;
      this.$options._InitialForm.type = "contact:add";
      this._setInitialPreRequest([]);
    },
    async openAutoFIlledModal() {
      console.log("[Opening AddContacts modal]");
      this.modals.addContact = true;
      this.$options._InitialForm.model = InitialFormModelFilled;
      this.$options._InitialForm.type = "contact:add";

      const _phoneTypes = InitialFormModelFilled.PhoneModels.map(
        (e) => e.TypeId
      );
      const phoneTypes = _phoneTypes.filter(
        (e, i) => _phoneTypes.indexOf(e) == i
      );

      this._setInitialPreRequest(phoneTypes);
    },
    async openEditModal(e) {
      console.log("[Opening openEditModal modal]", e);

      this.editTargetModelIndex = ref(e.index);

      const genderId =
        e.formattedRow.phoneModels[0].personGetModelForPhone.genderId;
      const collectedFormData = Object.assign(
        {},
        {
          FirstName: e.formattedRow.firstname,
          LastName: e.formattedRow.lastname,
          GenderId: genderId,
          EmailAddress: e.formattedRow.emailAddress,
          PrivateNumber: e.formattedRow.privateNumber,
          BirthDate: convertToDateInput(e.formattedRow.birthDate),
          AddressCreateModels: e.formattedRow.addressGetModels.length
            ? e.formattedRow.addressGetModels
            : InitialFormModel.AddressCreateModels,
          PhoneModels: e.row.phoneModels.map((_n) => {
            return {
              TypeId: _n.typeId,
              PhoneNumber: _n.phoneNumber,
              PhoneIndexId: _n.phoneIndexId,
            };
          }),
        }
      );

      this.$options._InitialForm.model = collectedFormData;
      this.$options._InitialForm.type = "contact:edit";
      const phoneIndexRequest = e.formattedRow.phoneModels.map((e) => e.typeId);

      this._setInitialPreRequest(phoneIndexRequest);

      this.modals.addContact = true;
    },
    async onPhoneTypeChange(index) {
      const fetchFn = this.getPhoneIndexs.bind({}, index);
      const insideState = {
        isLoading: false,
        data: [],
        errors: {},
      };
      if (this.phoneIndexScheme.isLoading) {
        console.log("Loading", insideState);
      }
      if (!this.phoneIndexScheme.data[index]) {
        return;
      }
      this.phoneIndexScheme.isLoading = true;

      if (!this.phoneIndexScheme.data[index].indexs.length) {
        await this.$options.checkPrefetch.call(insideState, fetchFn);
        await new Promise((r) =>
          setTimeout(() => {
            r();
          }, 500)
        );

        if (!Object.entries(insideState.errors).length) {
          this.phoneIndexScheme.data[index].indexs = insideState.data.data;
          this.phoneIndexsState.data = insideState.data.data;
        } else {
          this.phoneIndexScheme.errors = {
            ...this.phoneIndexScheme.errors,
            ...{ errorOnIndex: "Phone index error" },
          };
        }
      }
      this.phoneIndexScheme.isLoading = false;
    },
    async onActions(action, prop) {
      switch (action) {
        case "phoneTypeChange":
          await this.onPhoneTypeChange(prop);
          break;
        case "livingType":
          await this.setLivingAreas(prop);

          break;
        default:
          break;
      }
    },
    async onSubmitForm(e) {
      // static objects no cors no requests

      switch (this.$options._InitialForm.type) {
        case "contact:add":
          // this.editTargetModelIndex = null;

          const addContactModel = JSON.parse(
            JSON.stringify({
              id: new Date().getTime(),
              firstname: e.FirstName,
              lastname: e.LastName,
              privateNumber: e.PrivateNumber,
              birthDate: new Date(e.BirthDate),
              emailAddress: e.EmailAddress,
              genderId: e.GenderId,
              gender: this.genderEnumsState.data.find((g) => g.id == e.GenderId)
                .name,
              legalId: null,
              isActive: true,
              legalGetModel: null,
              addressGetModels: [],
              phoneModels: reactive(
                e.PhoneModels.map((p) => {
                  return {
                    id: "",
                    personId: "",
                    phoneIndexId: p.PhoneIndexId,
                    phoneNumber: p.PhoneNumber,
                    typeId: p.TypeId,
                    phoneType: this.phoneIndexScheme.data[p.TypeId].name,
                    personGetModelForPhone: {
                      id: "",
                      firstname: e.FirstName,
                      lastname: e.LastName,
                      privateNumber: e.PrivateNumber,
                      birthDate: new Date(e.BirthDate),
                      emailAddress: e.EmailAddress,
                      genderId: e.GenderId,
                      gender: this.genderEnumsState.data.find(
                        (_g) => _g.id === e.GenderId
                      ).name,
                      legalId: null,
                      isActive: true,
                      legalGetModel: null,
                      addressGetModels: null,
                    },
                  };
                })
              ),
              addressGetModels: e.AddressCreateModels.map((e) => {
                return e;
              }),
            })
          );
          this.$options._InitialForm.model = InitialFormModel;
          this.$options._InitialForm.type = "";
          this.contactsListState.data.unshift(addContactModel);
          break;
        case "contact:edit":
          this.contactsListState.data[this.editTargetModelIndex] = {
            id: new Date().getTime(),
            firstname: e.FirstName,
            lastname: e.LastName,
            privateNumber: e.PrivateNumber,
            birthDate: new Date(e.BirthDate),
            emailAddress: e.EmailAddress,
            genderId: e.GenderId,
            gender: this.genderEnumsState.data.find((g) => g.id == e.GenderId)
              .name,
            legalId: null,
            isActive: true,
            legalGetModel: null,
            addressGetModels: [],
            phoneModels: reactive(
              e.PhoneModels.map((p) => {
                return {
                  id: "",
                  personId: "",
                  phoneIndexId: p.PhoneIndexId,
                  phoneNumber: p.PhoneNumber,
                  typeId: p.TypeId,
                  phoneType: this.phoneIndexScheme.data[p.TypeId].name,
                  personGetModelForPhone: {
                    id: "",
                    firstname: e.FirstName,
                    lastname: e.LastName,
                    privateNumber: e.PrivateNumber,
                    birthDate: new Date(e.BirthDate),
                    emailAddress: e.EmailAddress,
                    genderId: e.GenderId,
                    gender: this.genderEnumsState.data.find(
                      (_g) => _g.id === e.GenderId
                    ).name,
                    legalId: null,
                    isActive: true,
                    legalGetModel: null,
                    addressGetModels: null,
                  },
                };
              })
            ),
            addressGetModels: e.AddressCreateModels.map((e) => {
              return e;
            }),
          };

          this.editTargetModelIndex = null;
          this.$options._InitialForm.model = InitialFormModel;
          this.$options._InitialForm.type = "";
          break;
        default:
          break;
      }

      this.modals.addContact = false;

      // ContactsService.addContact(this.addContactForm).then((r) => {
      //   console.log("genders", r);
      // });
    },
    onTableActions(actionKey, props) {
      switch (actionKey) {
        case "edit":
          this.openEditModal(props);
          break;
        case "delete":
          this.contactsListState.data.splice(props.index, 1);
          break;

        case "view":
          this.$router.push({
            name: "contact-page",
            params: { userId: props.index },
          });
          break;
        default:
          break;
      }
    },
    onModalClose() {
      this.$route.params = {};
    },
    onPageState(type, e) {
      const obj = {};
      obj.formattedRow = e.data;
      obj.row = e.data;
      this.openEditModal(obj);
    },
  },
  provide() {
    return {
      _pageState: {
        contactsState: this.contactsListState,
        openModal: this.onPageState,
      },
    };
  },
};
</script>

<template>
  <div class="page-layout">
    <div class="page-head">
      <div class="page-title">
        <h1>About Child</h1>
      </div>
      <div class="right-area">
        <Button type="light" @click="openAddModal">Add Contact</Button>
        /
        <Button type="primary" @click="openAutoFIlledModal"
          >Add Contact (filled)</Button
        >
      </div>
    </div>
    <!-- <pre>
    {{ $options._InitialForm }}
  </pre> -->
    <router-view />
    <div class="contant-list">
      <ContactList
        @onAction="onTableActions"
        v-if="contactsListState"
        :list="contactsListState"
      />
    </div>
  </div>
  <Modal
    @onModalClose="onModalClose"
    v-model:show="modals.addContact"
    title="Add Contact"
    width="750px"
  >
    <div v-bind:style="{ heght: '2500px' }">
      <ContactForm
        ref="ContactsModal"
        :type="$options._InitialForm.type"
        :formData="$options._InitialForm"
        :genderTypes="genderEnumsState"
        :livingAreaTypes="livingAreaTypeEnums"
        :livingAreaList="livingAreaList"
        :activeLivingAreaType="activeLivingAreaType"
        :phoneIndexScheme="phoneIndexScheme"
        @onSubmit="onSubmitForm"
        @onActions="onActions"
      />
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.page-title {
  padding: 25px;
}
.page-head {
  @extend %flex;
}
.right-area {
  @extend %flex;
  @extend %flex--center;
  padding: 2px 20px;
}
</style>
