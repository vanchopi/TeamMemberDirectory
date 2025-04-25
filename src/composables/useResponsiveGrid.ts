import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useResponsiveGrid() {
  const columnsPerRow = ref<number>(3);
  const itemHeight = ref<number>(221);

  const update = (): void => {
    const width = window.innerWidth;

    if (width <= 510) {
      columnsPerRow.value = 1;
      itemHeight.value = 150;
    } else if (width <= 680) {
      columnsPerRow.value = 2;
      itemHeight.value = 190;
    } else {
      columnsPerRow.value = 3;
      itemHeight.value = 221;
    }
  };

  onMounted(() => {
    update();
    window.addEventListener('resize', update);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', update);
  });

  return {
    columnsPerRow,
    itemHeight
  };
}
