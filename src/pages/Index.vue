<template>
  <div>
    <!--  <q-page class="flex flex-center">-->
    <!--    <q-page>-->
    <!--    <img-->
    <!--      alt="Quasar logo"-->
    <!--      src="~assets/quasar-logo-vertical.svg"-->
    <!--      style="width: 200px; height: 200px"-->
    <!--    >-->
    <!--      <Timeline />-->
    <!--      <GanttHight />-->
    <NewGantt />
    <!--  </q-page>-->
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  components: {
    // Timeline: () => import('src/components/TimeLine'),
    // GanttHight: () => import('src/components/TestHightCharts'),
    NewGantt: () => import("components/Newgantt/Newgantt")
  },
  data() {
    return {
      name: "Miguel"
    };
  }
};
</script>
