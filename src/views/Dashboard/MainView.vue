<script>
import ContactsService from "@/services/ContactsService";
import ContactList from "@/components/Contacts/ContactList.vue";
export default {
  inject: ["store"],
  components: { ContactList },
  data() {
    return {
      contacts: [],
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchContacts();
      },
      { immediate: true }
    );
  },

  mounted() {
    // console.log("object", this.contacts);
  },

  methods: {
    fetchContacts() {
      const localContacts = !!localStorage.getItem("contacts")
        ? localStorage.getItem("contacts")
        : [];
      if (!localContacts.length) {
        ContactsService.getAll().then((r) => {
          this.contacts = r.data;
          window.localStorage.setItem("contacts", JSON.stringify(r.data));
        });
      } else {
          this.contacts = JSON.parse(localContacts);
      }
    },
  },
};
</script>

<template>
  <div class="page-layout">
    <div class="page-title">
      <h1>App Dashboard</h1>
    </div>
    <!-- <ContactList v-if="contacts.length" :list="contacts" /> -->
  </div>
</template>

<style scoped>
.page-layout {
  padding: 25px;
}
</style>
