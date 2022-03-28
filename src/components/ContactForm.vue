<template>
  <Loader :show="isLoading" />
  <div class="form-modal-wrap">
    <div v-if="false" class="error-bo">
      {{ $props.genderTypes.errors }}
      {{ $props.livingAreaList.errors }}
      {{ $props.phoneIndexScheme.errors }}
    </div>
    <FormBox ref="formBox" @submit="submitForm">
      <div class="contact-form">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <FormInput
                type="text"
                placeholder="john"
                autocomplete="off"
                v-model="v.FirstName.$model"
                @blur="(e) => (this.firstnameRef = e.target.value)"
              >
                <template #label><p>First Name:</p></template>
                <template v-if="v.FirstName.$errors.length" #errors>
                  <p>
                    {{ v.FirstName.$errors[0].$message }}
                  </p>
                </template>
              </FormInput>
            </div>
            <div class="col-md-6">
              <FormInput
                type="text"
                name="LastName"
                v-model="v.LastName.$model"
                placeholder="doe"
              >
                <template #label><p>Last Name:</p></template>
                <template v-if="v.LastName.$errors.length" #errors>
                  <p>
                    {{ v.LastName.$errors[0].$message }}
                  </p>
                </template>
              </FormInput>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <FormSelect
                name="GenderId"
                placeholder="gender"
                :model="v.GenderId.$model"
                v-model="v.GenderId.$model"
              >
                <template #label><p>Gender:</p></template>
                <template #options>
                  <option value="" disabled selected>Select your option</option>
                  <option
                    v-for="(e, i) of genderTypes.data"
                    :key="i.id"
                    :value="e.id"
                  >
                    {{ e.name }}
                  </option>
                </template>
                <template v-if="v.GenderId.$errors" #errors>
                  <p v-for="error of v.GenderId.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </template>
              </FormSelect>
            </div>
            <div class="col-md-6">
              <FormInput
                @blur="() => {}"
                type="date"
                name="BirthDate"
                placeholder="BirthDate"
                :value="v.BirthDate.$model"
                v-model="v.BirthDate.$model"
              >
                <template #label><p>Birth Date:</p></template>
                <template v-if="v.BirthDate.$errors" #errors>
                  <p v-for="error of v.BirthDate.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </template>
              </FormInput>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <FormInput
                type="text"
                placeholder="ID"
                v-model="v.PrivateNumber.$model"
              >
                <template #label><p>Private Number:</p></template>
                <template v-if="v.PrivateNumber.$errors.length" #errors>
                  <p>
                    {{ v.PrivateNumber.$errors[0].$message }}
                  </p>
                </template>
              </FormInput>
            </div>
            <div class="col-md-6">
              <FormInput
                type="text"
                name="EmailAddress"
                v-model="v.EmailAddress.$model"
                placeholder="example@mail.com"
              >
                <template #label><p>Email Address:</p></template>
                <template v-if="v.EmailAddress.$errors.length" #errors>
                  <p>
                    {{ v.EmailAddress.$errors[0].$message }}
                  </p>
                </template>
              </FormInput>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <!-- <div class="form-section--title">
              <p>Living Address:</p>
            </div> -->
              <div class="addres-type--wrap" v-bind:style="{ padding: ' ' }">
                <label
                  v-for="(type, key) of $props.livingAreaTypes"
                  :key="key"
                  class="addres-type--item"
                >
                  <div class="addres-type--content">
                    <input
                      v-model="_activeLivingAreaType"
                      type="radio"
                      name="addres-type"
                      :value="type.id"
                      :disabled="$props.livingAreaList.isLoading"
                    />
                  </div>
                  <div class="addres-type--title">{{ type.name }}</div>
                </label>
              </div>
            </div>
            <div class="col-md-4">
              <FormSelect
                name="address"
                placeholder="address"
                :model="vLiving.livingAreaId.$model"
                v-model="vLiving.livingAreaId.$model"
                @change="onLivingAreaChange"
              >
                <template #label><p>Living area:</p></template>
                <template #options>
                  <option value="" disabled selected>Select your option</option>
                  <option
                    v-for="(e, i) of $props.livingAreaList.data"
                    :key="i.id"
                    :value="e.id"
                  >
                    {{ e.name }}
                  </option>
                </template>
                <template #errors>
                  <div>
                    <div
                      v-for="error in vLiving.livingAreaId.$errors"
                      :key="error"
                    >
                      {{ error.$message }}
                    </div>
                  </div>
                </template>
              </FormSelect>
            </div>
            <div class="col-md-6">
              <FormInput
                @blur="
                  (e) => {
                    addContactForm.AddressCreateModels[0].DetailedAddress =
                      e.target.value;
                  }
                "
                type="select"
                name="DetailedAddress"
                placeholder="Address"
                v-model="vLiving.DetailedAddress.$model"
              >
                <template #label><p>Address:</p></template>
                <template v-if="vLiving.DetailedAddress.$errors.length" #errors>
                  <div>
                    <div
                      v-for="error in vLiving.DetailedAddress.$errors"
                      :key="error"
                    >
                      {{ error.$message }}
                    </div>
                  </div>
                </template>
              </FormInput>
            </div>
          </div>
          <div class="rowx" v-if="false">
            <ContactPhonesLine
              v-for="(phoneNumber, key) in addContactForm.PhoneModels"
              :key="key"
              @onPhoneTypeChange="onPhoneTypeChange"
              :phoneIndexScheme="$props.phoneIndexScheme"
              :phoneModels="phoneNumber"
            >
              <template #actions>
                <div>
                  <Button
                    type="button"
                    v-if="addContactForm.PhoneModels.length > 1"
                    @click="removePhoneNumber(key)"
                    >-</Button
                  >
                  <Button
                    type="button"
                    v-if="
                      addContactForm.PhoneModels.length == 1 ||
                      key == addContactForm.PhoneModels.length - 1
                    "
                    @click="addPhoneNumber"
                    >+</Button
                  >
                </div>
              </template>
            </ContactPhonesLine>
          </div>

          <div
            v-for="(phoneNumber, key) in addContactForm.PhoneModels"
            :key="key"
            :set="
              (set = {
                hasError: (hasError = !!(
                  v.PhoneModels.$each.$response &&
                  v.PhoneModels.$each.$response.$errors[key]
                )),
              })
            "
            class="row"
          >
            <div class="col-md-3">
              <FormSelect
                name="typeId"
                placeholder="Type"
                :model="phoneNumber.TypeId"
                v-model="phoneNumber.TypeId"
                :items="$props.phoneTypes"
                @change="onPhoneTypeChange($event, phoneNumber)"
              >
                <template #label><p>Phone type:</p></template>
                <template #options>
                  <option value="" disabled selected>Select your option</option>
                  <option
                    v-for="(e, i) of $props.phoneIndexScheme.data"
                    :key="i.id"
                    :value="e.id"
                  >
                    {{ e.name }}
                  </option>
                </template>
                <template v-if="set.hasError" #errors>
                  <div>
                    <div
                      v-for="error in v.PhoneModels.$each.$response.$errors[key]
                        .TypeId"
                      :key="error"
                    >
                      {{ error.$message }}
                    </div>
                  </div>
                </template>
              </FormSelect>
            </div>
            <div class="col-md-3">
              <FormSelect
                name="PhoneIndexId"
                placeholder="PhoneIndex"
                :model="phoneNumber.PhoneIndexId"
                v-model="phoneNumber.PhoneIndexId"
              >
                <template #label><p>Index:</p></template>
                <template v-if="set.hasError" #errors>
                  <div>
                    <div
                      v-for="error in v.PhoneModels.$each.$response.$errors[key]
                        .PhoneIndexId"
                      :key="error"
                    >
                      {{ error.$message }}
                    </div>
                  </div>
                </template>
                <template
                  #options
                  v-if="$props.phoneIndexScheme.data[phoneNumber.TypeId]"
                >
                  <option value="" disabled selected>Select your option</option>

                  <option
                    v-for="(e, i) of $props.phoneIndexScheme.data[
                      phoneNumber.TypeId
                    ].indexs"
                    :key="i.id"
                    :value="e.id"
                  >
                    {{ e.index }}
                  </option>
                </template>
                <template v-else #options>
                  <option value="" disabled selected>Select your option</option>
                </template>
              </FormSelect>
            </div>
            <div class="col-md-6">
              <div class="flex">
                <div class="input-wr" :style="{ flex: 1 }">
                  <FormInput
                    type="text"
                    name="lastName"
                    placeholder="PhoneNumber"
                    v-model="phoneNumber.PhoneNumber"
                  >
                    <template #label><p>PhoneNumber:</p></template>
                    <template v-if="set.hasError" #errors>
                      <div
                        v-if="
                          v.PhoneModels.$each.$response.$errors[key].PhoneNumber
                            .length
                        "
                      >
                        {{
                          v.PhoneModels.$each.$response.$errors[key]
                            .PhoneNumber[0].$message
                        }}
                      </div>
                    </template>
                  </FormInput>
                </div>
                <div class="field-col actions">
                  <div>
                    <Button
                      type="button"
                      v-if="addContactForm.PhoneModels.length > 1"
                      @click="removePhoneNumber(key)"
                      >-</Button
                    >
                    <Button
                      type="button"
                      v-if="
                        addContactForm.PhoneModels.length == 1 ||
                        key == addContactForm.PhoneModels.length - 1
                      "
                      @click="addPhoneNumber"
                      >+</Button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="divider-24"></div>
              <Button class="btn--big" type="light" v-bind:wide="true">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FormBox>
  </div>
  <!-- <pre v-if="!_showForm">
      {{ addContactForm }}
  </pre> -->
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import {
  helpers,
  minLength,
  required,
  email,
  minValue,
  maxValue,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { Bar } from "./ExtraComponents.jsx";
import { ValidateEach } from "@vuelidate/components";
import {
  dependOnLetter,
  letterCheck,
  strictLength,
  onlyNumbers,
} from "@/utils/validators.js";
import ContactPhonesLine from "@/components/Contacts/ContactPhonesLine.vue";

export default {
  components: { Bar, ValidateEach, ContactPhonesLine },
  props: [
    "formData",
    "model",
    "type",
    "livingAreaTypes",
    "livingAreaList",
    "activeLivingAreaType",
    "genderTypes",
    "phoneIndexScheme",
    "onActions",
  ],
  emits: ["onSubmit", "phoneTypeChange", "onActions"],
  data() {
    return {
      _addContactForm: Object.assign(
        {},
        JSON.parse(JSON.stringify(this.$props.formData.model))
      ),
      _activeLivingAreaType: this.$props.activeLivingAreaType, // !!! no auto fetch allowed
      livingAreaId: "",
      _showForm: false,
      editedFields: {},
    };
  },
  setup(props, context) {
    const addContactForm = reactive(
      JSON.parse(JSON.stringify(props.formData.model))
    );

    const initialFormData = JSON.parse(JSON.stringify(props.formData.model));

    const activeLivingType = reactive(
      props.livingAreaTypes.find((e) => e.id === props.activeLivingAreaType)
    );

    const firstnameRef = ref(addContactForm.FirstName);
    const lastnameRef = ref(addContactForm.LastName);
    
    let livingAreaId = ref(
      addContactForm.AddressCreateModels[0][activeLivingType.key]
    );
    const MainRules = {
      FirstName: {
        required,
        letterCheck,
      },
      LastName: {
        required,
        letterCheck,
        dependOnLetter: helpers.withParams(
          { targetName: "First Name" },
          helpers.withMessage(({ $pending, $invalid, $params, $model }) => {
            return `Field must be the same typed as ${$params.targetName}`;
          }, dependOnLetter(firstnameRef))
        ),
      },
      GenderId: { required },
      PrivateNumber: { required, onlyNumbers, strictLength: strictLength(11) },
      BirthDate: { required },
      EmailAddress: { required, email },
      PhoneModels: {
        $each: helpers.forEach({
          PhoneNumber: {
            required,
            onlyNumbers,
            strictLength: strictLength(6),
          },
          PhoneIndexId: {
            required,
          },
          TypeId: {
            required,
          },
        }),
      },
      AddressCreateModels: {
        DetailedAddress: {},
      },
    };

    const livignAreaValidators = {
      livingAreaId: {
        required,
      },
      DetailedAddress: {
        required,
      },
    };

    const livingAreaState = reactive({
      livingAreaId,
      DetailedAddress: addContactForm.AddressCreateModels[0].DetailedAddress,
    });

    const vLiving = useVuelidate(livignAreaValidators, livingAreaState);

    const v = useVuelidate(MainRules, addContactForm, { $rewardEarly: true });

    return {
      livingAreaId,
      lastnameRef,
      firstnameRef,
      addContactForm,
      initialFormData,
      livingAreaState,
      v,
      vLiving,
    };
  },
  computed: {
    isLoading: function () {
      return !!(
        this.$props.livingAreaList.isLoading ||
        this.$props.genderTypes.isLoading ||
        this.$props.phoneIndexScheme.isLoading
      );
    },
    activeLeavingType() {
      return this.$props.livingAreaTypes.find(
        (e) => e.id === this._activeLivingAreaType
      );
    },
    _editFields() {
      return "obj";
    },
  },
  watch: {
    _activeLivingAreaType(e) {
      this.$emit("onActions", "livingType", this.activeLeavingType.id);
      this.livingAreaId = "";
      this.livingAreaState.livingAreaId = "";

      this.vLiving.$reset();
      this.vLiving.$commit();

      for (const key in this.addContactForm.AddressCreateModels[0]) {
        if (
          Object.hasOwnProperty.call(
            this.addContactForm.AddressCreateModels[0],
            key
          )
        ) {
          if (key !== "DetailedAddress") {
            this.addContactForm.AddressCreateModels[0][key] = null;
          }
        }
      }
    },
  },
  mounted() {},
  methods: {
    async submitForm(e) {
      await this.v.$touch();
      const formValid = await this.v.$validate();
      const livingAreaValid = await this.vLiving.$validate();

      if (formValid && livingAreaValid) {
        // this.$emit("onSubmit", this.addContactForm);

        switch (this.$props.type) {
          case "contact:add":
            this.$emit("onSubmit", this.addContactForm);
            break;
          case "contact:edit":
            const editFields = this._checkEditFields(
              this.initialFormData,
              this.addContactForm
            );
            console.log("[Edited Fields]", editFields);
            this.$emit("onSubmit", this.addContactForm);
            break;

          default:
            break;
        }
      }

      // this.$emit("onSubmit", this.addContactForm);
    },
    addPhoneNumber() {
      const emptyPhoneModel = {};
      Object.keys(this.addContactForm.PhoneModels[0]).forEach((e) => {
        emptyPhoneModel[e] = "";
      });
      // this.v.PhoneModels.$reset();
      this.addContactForm.PhoneModels.push(emptyPhoneModel);
      // this.state.collection.push({name: ""});
    },
    removePhoneNumber(key) {
      this.addContactForm.PhoneModels.splice(key, 1);
    },
    onPhoneTypeChange(e, item) {
      this.$emit("onActions", "phoneTypeChange", e.target.value);
      item.PhoneIndexId = "";
    },
    onLivingAreaChange(e) {
      const key = e.target.value;
      this.addContactForm.AddressCreateModels[0][this.activeLeavingType.key] =
        key;
      // this.livingAreaState.livingAreaId = key;
    },
    _checkEditFields(initial, target) {
      const obj = {};

      for (var _key in target) {
        if (!initial.hasOwnProperty(_key)) {
          obj[_key] = target[_key];
        }
      }

      for (var key in initial) {
        if (!target.hasOwnProperty(key)) {
          obj[key] = initial[key];
        } else {
          if (initial[key] instanceof Array) {
            const fullArraySize =
              initial[key].length < target[key].length
                ? target[key].length
                : initial[key].length;
            const array = Array(fullArraySize);
            obj[key] = array;

            for (var i = 0; i < array.length; i++) {
              if (initial[key][i] instanceof Object) {
                // !!! (slice case)
                if (!!target[key][i]) {
                  const arrOb = this._checkEditFields(
                    initial[key][i],
                    target[key][i]
                  );

                  if (Object.entries(arrOb).length) {
                    obj[key][i] = arrOb;
                  }
                } else {
                  obj[key][i] = {};
                }
              } else {
                if (initial[key][i] !== target[key][i]) {
                  obj[key][i] = target[key][i];
                }
              }
            }
          } else if (initial[key] instanceof Object) {
            const checkObj = this._checkEditFields(initial[key], target[key]);
            if (Object.entries(checkObj).length) {
              obj[key] = checkObj;
            }
          } else if (
            typeof initial[key] == typeof "" ||
            typeof initial[key] == typeof 0
          ) {
            if (initial[key] !== target[key]) {
              obj[key] = target[key];
            }
          }
        }
      }

      return obj;
    },
  },
};
</script>

<style lang="scss">
.flex {
  @extend %flex;
}

.field-col.actions {
  padding-top: 26px;
  padding-left: 20px;

  &.actions {
    @extend %flex;

    .btn {
      height: $base-form-input-height;
      width: $base-form-input-height;
    }
  }
}

.form-modal-wrap {
  position: relative;

  .head-loader {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.contact-form {
  padding: 30px 10px;
}
.addres-type {
  &--wrap {
  }
  &--item {
    display: flex;
  }
  &--title {
    font-size: em(18);
    margin-left: 10px;
  }
  &--content {
  }
}

.loader {
  position: absolute;
  top: -31px;
  left: 135px;
}
</style>