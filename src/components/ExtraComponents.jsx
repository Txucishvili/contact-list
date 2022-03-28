import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { defineComponent, reactive } from "vue"

const Bar = defineComponent({
    props: ['fields', "onRemove"],
    emits: ["onRemove"],
    data() {
        return {
            el: "",
            field: "",
        }
    },
    setup(props) {
        console.log(props.fields)

        const modelEl = {
            PhoneNumber: props.fields.PhoneNumber ?? ""
        }

        const rules = {
            PhoneNumber: {
                required,
                minLength: minLength(4)
            }
        }
        const v = useVuelidate(rules, props.fields, { $rewardEarly: false });

        return { modelEl, v };
    },
    mounted() {
        console.log("object", this.v)
    },
    methods: {
        onChange() {
            this.v.$touch()
            console.log("object", this.v)
        }
    },
    render() {
        return <div>
            {this.$props.fields.PhoneNumber}
            {this.modelEl.PhoneNumber}
            <input onKeyup={this.onChange.bind(this)} type="text" v-model={this.$props.fields.PhoneNumber} />
            <button onClick={this.$emit("onRemove")}>-</button>
            {this.v.$errors.length ?
                <div>
                    <p>
                        errors
                        {this.v.$errors[0].$message}
                    </p>
                </div>
                : <div></div>}

        </div>
    }
})



const PhoneNumbersLine = defineComponent({
    props: ['fields', "keys"],
    emits: ["onRemove"],
    data() {
        return {
            el: "",
            field: "",
        }
    },
    setup(props) {
        console.log(props.fields)

        const modelEl = {
            PhoneNumber: props.fields.PhoneNumber ?? ""
        }

        const rules = {
            PhoneNumber: {
                required,
                minLength: minLength(4)
            }
        }
        const v = useVuelidate(rules, props.fields, { $rewardEarly: false });

        return { modelEl, v };
    },
    mounted() {
        console.log("object", this.v)
    },
    methods: {
        onChange() {
            this.v.$touch()
            console.log("object", this.v)
        },
        onOnRemove(e) {
            console.log("------------ hit")
            this.$emit("onRemove", this.$props.keys)
        }
    },
    render() {
        return <div>
             <FormInput
                type="text"
                name="lastName"
                placeholder="PhoneNumber"
              >
                <template name="label"><p>PhoneNumber:</p></template>
                <template name="errors">
                  <div>
                    <div
                    >
                     error
                    </div>
                  </div>
                </template>
              </FormInput>
            </div>
    }
})

export { Bar, PhoneNumbersLine };
