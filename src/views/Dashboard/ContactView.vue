<script>
import ContactsService from "@/services/ContactsService";
import ContactList from "@/components/Contacts/ContactList.vue";
import Modal from "@/components/Modal/Modal.vue";
import { useRoute } from "vue-router";
import { statePreFetch } from "@/utils/functions";
import { reactive, ref, watch } from "@vue/runtime-core";

function getPersons(e) {
  return ContactsService.getContact("example").then((r) => {
    const _person = r.data.data[0];
    return _person;
  });
}

export default {
  inject: ["store", "_pageState"],
  components: { ContactList, Modal },
  data() {
    return {
      showModal: true,
      personItem: {},
    };
  },
  setup() {
    const route = useRoute();
    const personItemState = reactive({
      isLoading: false,
      isLoaded: false,
      data: {},
      errors: {},
    });

    watch(
      () => route.params.userId,
      async () => {
        personItemState.isLoading = true;
        personItemState.data = await getPersons("example");
        personItemState.isLoaded = true;
        personItemState.isLoading = false;
      },
      { immediate: true }
    );
    return { personItemState };
  },
  beforeRouteEnter() {},
  async beforeRouteLeave(e) {},
  mounted() {
    this.showModal = true;
  },
  methods: {
    getPersons(uid) {
      return getPersons(uid);
    },
    onModalClose() {
      this.showModal = false;
      this.$router.push({ name: "Contacts" });
    },
  },
  computed: {
    phoneList() {
      if (this.personItemState.isLoading) {
        return;
      }
      return this.personItemState.data.phoneModels.reduce(
        (initial, el, i, target) => {
          const hasType = initial.find((e) => e.typeId === el.typeId);

          if (!hasType) {
            initial.push({
              typeId: el.typeId,
              phoneType: el.phoneType,
              phones: [el],
            });
          } else {
            hasType.phones.push(el);
          }

          return initial;
        },
        []
      );
    },
  },
};
</script>

<template>
  <div class="page-layout">
    <Modal
      @onModalClose="onModalClose"
      v-model:show="showModal"
      title="Contact"
      width="750px"
    >
      <div>
        <div class="container-fluid contact--info">
          <div class="contact--name">
            <div class="row">
              <div class="col-md-12">
                <h2>
                  {{ personItemState.data.firstname }}
                  {{ personItemState.data.lastname }}
                </h2>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="contact--details">
                  <div class="contact--details--title">
                    <p>Private Number:</p>
                  </div>
                  <div class="contact--details--desc">
                    {{ personItemState.data.privateNumber }}
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="contact--details">
                  <div class="contact--details--title"><p>Gender:</p></div>
                  <div class="contact--details--desc">
                    {{ personItemState.data.gender }}
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="contact--details">
                  <div class="contact--details--title"><p>Birth Date:</p></div>
                  <div class="contact--details--desc">
                    {{ personItemState.data.birthDate }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="contact--details">
                  <div class="contact--details--title">
                    <p>Email address:</p>
                  </div>
                  <div class="contact--details--desc">
                    {{ personItemState.data.emailAddress }}
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="contact--details">
                  <div class="contact--details--title">
                    <p>Active Status:</p>
                  </div>
                  <div class="contact--details--desc">
                    {{ personItemState.data.isActive ? "Active" : "Inactive" }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="contact--details">
                  <div class="contact--details--title">
                    <p>Phone Numbers:</p>
                  </div>
                  <div class="contact--details--desc">
                    <div
                      v-for="(phone, key) in phoneList"
                      :key="key"
                      class="phone--number"
                    >
                      <div class="phone--type">
                        {{ phone.phoneType }}
                      </div>
                      <div class="phone--list">
                        <div
                          v-for="(number, i) in phone.phones"
                          :key="i"
                          class="phone--item"
                        >
                          <div class="phone--index decor">
                            {{ number.phoneIndexGetModel.index }}
                          </div>
                          <div class="phone--code decor">
                            {{ number.phoneNumber }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="contact--details">
                  <div class="contact--details--title"><p>Address:</p></div>
                  <div class="contact--details--desc">
                    {{ personItemState.data.AddressCreateModels }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 
        <div :style="{ padding: '30px 20px' }">
          <Button @click="_pageState.openModal('edit', personItemState)"
            >edit</Button
          >
          <Button
            @click="
              $router.push({
                name: 'contact-page',
                params: { userId: parseFloat($route.params.userId) - 1 },
              })
            "
            >prev</Button
          >
          <Button
            @click="
              $router.push({
                name: 'contact-page',
                params: { userId: parseFloat($route.params.userId) + 1 },
              })
            "
            >nex</Button
          >
        </div> -->
        <!-- <pre>{{ phoneList }}</pre> -->
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  &--info {
    padding: 30px;

    .row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &--details {
    &--title {
      @extend %theme-small-capsed;
      font-variant: small-caps;
      text-transform: lowercase;
      display: flex;
      @include FontCairo(16, 400);

      p {
        padding: 10px 10px;
        background-color: var(--theme-dark);
      }
    }

    &--desc {
      padding: 10px 15px;
      // @include FontCairo(20, 600);
      border: 2px solid var(--theme-dark);
    }
  }
}

.phone {
  &--number {
    .decor {
      padding-left: 4px;
      padding-top: 4px;
      padding-right: 4px;
      padding-bottom: 4px;
    }
  }
  &--item {
    display: flex;
    padding: 5px 0px;
  }
  &--type {
    font-size: 14px;
    padding-top: 12px !important;
    padding-bottom: 8px !important;
    padding-left: 8px !important;
    background-color: darken($theme-dark, 3%);
  }
  &--index {
    background-color: darken($theme-dark, 0%);
  }
  &--code {
    background-color: darken($theme-dark, 0%);
  }
  &--number {
    // background-color: darken($theme-dark, 0%);
  }
  &--list {
    display: flex;
    > * {
      margin-left: 10px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
