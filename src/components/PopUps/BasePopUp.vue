<template>
  <q-dialog 
    v-model="showForm" 
    @hide="onClose"
    >
    <q-card 
      class="base-dialog" 
      style="width: 500px; 
      max-width: 100%"
      >
      <q-card-section class="header">
        <div class="text-h6">
          <slot name="title">
            Title
          </slot>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none content">
        <slot name="content">
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Props {
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const showForm = ref<boolean>(false);

const onClose = (): void => {
  emit("close");
};

watch(
  (): void => props.show,
  (): void => {
    showForm.value = props.show;
  }
);

</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.base-dialog{
  .text-h6{
    letter-spacing: -1px;
    font-style: italic;
    font-weight: 600;
  }
  .header{
    background-color: $table-header-color;
    padding: 14px 50px
  }
  .content{
    padding: 10px 30px;
  }
}
</style>
