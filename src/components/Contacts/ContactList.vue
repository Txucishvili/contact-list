<template>
  <div class="contanct-list">
    <!-- <ContactItem v-for="(i, key) in $props.list" :key="{ key }" /> -->
    <div class="contact-list--wrap">
      <vue-good-table
        :columns="columns"
        :rows="$props.list.data"
        :pagination-options="{
          enabled: true,
          perPage: 20,
          position: 'top',
          perPageDropdown: [5, 10, 15],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All',
        }"
      >
        <template #table-row="props">
          <div v-if="props.column.field == 'actions'">
            <div>
              <Button @click="$emit('onAction', 'view', props)" type="light">View</Button>
              <Button @click="$emit('onAction', 'edit', props)" type="light">Edit</Button>
              <Button  @click="$emit('onAction', 'delete', props)" type="danger">Delete</Button>
            </div>
          </div>
          <div v-if="props.column.field == 'phoneModels'">
            <div vif="phoneModels" v-for="(phone, key) of props.row.phoneModels" :key="key">
              <p><span>{{phone.phoneType}}:</span>
              <span>{{phone.phoneNumber}}</span>
              </p>
            </div>
          </div>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import ContactItem from "./ContactItem.vue";
// import 'vue-good-table-next/dist/vue-good-table-next.css'
// import { VueGoodTable } from "vue-good-table-next";
import Button from "@/components/Button/Button.vue";
import Modal from "@/components/Modal/Modal.vue";

export default {
  props: ["list"],
  components: { ContactItem, Button, Modal },
  emits: ["onAction"],
  directives: {
    foo: {
      unbind(el, binding) {
        // Here you can perform the actions you need.
        // You can access the Vue instance using binding.value (eg: binding.value.$el)
        console.log("object", el.parentNode, binding);
      },
    },
  },
  methods: {
    afterLeave(e) {
      // console.log("afterLeave", e, this.$refs);
    },
    beforeEnter(e) {
      // console.log("beforeEnter", e, this.$refs);
    },
  },
  data() {
    return {
      open: !true,
      animationControl: !true,
      columns: [
        {
          label: "Actions",
          field: "actions",
          width: "160px",
        },
        {
          label: "firstname",
          field: "firstname",
          width: "120px",
        },
        {
          label: "lastname",
          field: "lastname",
          width: "190px",
        },
        {
          label: "phone numbers",
          field: "phoneModels",
          type: "string",
          width: "190px",
        },
        {
          label: "emailAddress",
          field: "emailAddress",
          width: "120px",
        },
        {
          label: "addressGetModels",
          field: "addressGetModels",
          width: "120px",
        },
        {
          label: "privateNumber",
          field: "privateNumber",
          width: "120px",
        },
        {
          label: "birthDate",
          field: "birthDate",
          width: "120px",
        },
        {
          label: "gender",
          field: "gender",
          width: "120px",
        },
        {
          label: "isActive",
          field: "isActive",
          width: "120px",
        },
      ],
    };
  },
  computed() {
    return {
      rows: $props.list.data,
    };
  },
  mounted() {},
};
</script>

<style lang="scss">
// @import "vue-good-table-next/src/styles/style.scss";
@import "@/sass/libs/vue-table-theming.scss";
.contact-list {
  overflow: hidden;

  &--wrap {
    // margin: 0 -1px;
  }
}
</style>