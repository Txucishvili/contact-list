<template>
  <div class="row">
    <div class="col-md-3">
      <FormSelect
        name="typeId"
        placeholder="Type"
        :model="v.TypeId.$model"
        v-model="v.TypeId.$model"
        @change="onPhoneTypeChange($event)"
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
        <template v-if="v.TypeId.$errors.length" #errors>
          <div>
            {{ v.TypeId.$errors[0].$message }}
          </div>
        </template>
      </FormSelect>
    </div>
    <div class="col-md-3">
      <FormSelect
        name="PhoneIndexId"
        placeholder="PhoneIndex"
        :model="v.PhoneIndexId.$model"
        v-model="v.PhoneIndexId.$model"
      >
        <template #label><p>Index:</p></template>
        <template v-if="v.PhoneIndexId.$errors.length" #errors>
          <div>
            {{ v.PhoneIndexId.$errors[0].$message }}
          </div>
        </template>
        <template #options v-if="$props.phoneIndexScheme.data[modelEl.TypeId]">
          <option value="" disabled selected>Select your option</option>

          <option
            v-for="(e, i) of $props.phoneIndexScheme.data[modelEl.TypeId]
              .indexs"
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
            v-model="v.PhoneNumber.$model"
          >
            <template #label><p>PhoneNumber:</p></template>
            <template v-if="v.PhoneNumber.$errors.length" #errors>
              <div>
                {{ v.PhoneNumber.$errors[0].$message }}
              </div>
            </template>
          </FormInput>
        </div>
        <div class="field-col actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  helpers,
  minLength,
  required,
  email,
  minValue,
  maxValue,
} from "@vuelidate/validators";
import { reactive } from "@vue/reactivity";
import {
  dependOnLetter,
  letterCheck,
  strictLength,
  onlyNumbers,
} from "@/utils/validators.js";
import useVuelidate from "@vuelidate/core";

export default {
  props: ["phoneModels", "phoneIndexScheme"],
  emits: ["onPhoneTypeChange"],
  setup(props) {
    const modelEl = props.phoneModels;
    

    const rules = {
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
    };
    const v = useVuelidate(rules, modelEl, { $rewardEarly: true });

    return { modelEl, v };
  },
  methods: {
    onPhoneTypeChange(e, key) {
      this.$emit("onPhoneTypeChange", e);
    },
  },
};
</script>

<style>
</style>