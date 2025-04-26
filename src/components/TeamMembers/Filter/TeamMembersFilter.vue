<template>
  <div class="page-filter flex justify-between items-end no-wrap">
    <div class="filter__wrapper row justify-start items-center">
      <div
        v-for="field in Object.keys(service?.defaultFilter)"
        :key="field"
        :class="`col-md-${service.fieldwidth[field]} col-sm-6 col-xs-12`"
      >
        <q-input
          v-if="inputFields.find((item) => item === field)"
          outlined
          dense
          :name="field"
          :loading="loading"
          debounce="1000"
          class="q-pr-md row-field"
          v-model="filter[field]"
          :label="getLabel(field, service?.listName)"
        />
        <q-select
          v-else-if="dropdownFields.find((item) => item === field)"
          outlined
          dense
          options-dense
          clearable
          :loading="loading"
          clear-icon="close"
          class="q-pr-md"
          :label="getLabel(field, service?.listName)"
          v-model="filter[field]"
          input-debounce="0"
          :options="options?.[field]"
        />
      </div>
    </div>
    <q-btn
      align="left"
      class="small"
      :class="gridType"
      :label="gridType"
      @click="onChangeGridType"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { TeamMember, TeamMembersFilter } from "@/types/teamMembers";
import { getLabel } from "@/utils/helpers";

interface Props {
  service: any;
  data: TeamMember[];
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  service: null,
  data: () => [],
  loading: false,
});

const emit = defineEmits<{
  (e: "update", filter: TeamMembersFilter): void;
}>();

const store = useStore();
const index = ref<number>(-1);
const filter = ref<TeamMembersFilter>({});
const inputFields = ref<string[]>([]);
const dropdownFields = ref<string[]>([]);
const options = ref<Record<string, unknown[]>>({});

const gridTypes = computed<string[]>(() => {
  return store?.state.teamMembers.gridTypes;
});

const gridType = computed<string>(() => {
  return store?.state.teamMembers.gridType;
});

const onChangeGridType = (): void => {
  index.value++;
  if (index.value > gridTypes.value.length - 1) {
    index.value = 0;
  }
  store.dispatch("teamMembers/setGridType", gridTypes.value[index.value]);
};

const getOptions = (field: string): string[] => {
  const result: string[] = [];
  if (Array.isArray(props.data)) {
    props.data.forEach((item) => {
      if (!result.includes(item[field])) {
        result.push(item[field]);
      }
    });
  }
  return result;
};

const setOptions = (): void => {
  const sources = props.service?.fieldSettings.options;
  for (const prop in sources) {
    options.value[prop] = [];
    options.value[prop] = getOptions(sources[prop]);
  }
};

const setDefaultFilter = (): void => {
  filter.value = JSON.parse(JSON.stringify(props.service?.defaultFilter));
};

const setFilterFields = (): void => {
  inputFields.value = [...inputFields.value, ...props.service?.inputFields];
  dropdownFields.value = [
    ...dropdownFields.value,
    ...props.service?.dropdownFields,
  ];
};

watch(
  (): void => props.data,
  (): void => {
    setOptions();
  },
  { deep: true }
);

watch(
  (): void => filter.value,
  (): void => {
    emit("update", filter.value);
  },
  { deep: true }
);

const setDefaultData = (() => {
  setDefaultFilter();
  setFilterFields();
  onChangeGridType();
})();
</script>
<style lang="scss">
@import "@/assets/scss/variables.scss";

.page-filter {
  margin: 20px 0;
  padding: 14px 15px;
  .q-btn {
    background-color: $blue-color;
    color: white;
    &.list {
      border-color: $item-border-color;
      color: $dark-grey;
      background-color: transparent;
    }
  }
  .row.filter__wrapper {
    width: 100%;
    .q-field--dense .q-field__label {
      top: 8px;
      color: $light-grey;
    }
  }
  .q-field--dense .q-field__marginal,
  .q-field--outlined .q-field__control,
  .q-field--auto-height.q-field--dense .q-field__control {
    min-height: 30px;
    height: 30px;
  }
  .q-field--labeled.q-field--dense .q-field__native {
    padding-top: 8px;
    font-size: 12px;
  }
  .q-field--auto-height.q-field--dense.q-field--labeled
    .q-field__control-container {
    padding-top: 4px;
  }
}
</style>
