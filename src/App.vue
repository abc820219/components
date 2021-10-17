<template>
  <div id="app">
    <div class="calender-container">
      <div class="calender-flex calender-flex-between" style="padding: 5px">
        {{ globalDate.getFullYear() }}年{{ globalDate.getMonth() + 1 }}月{{ globalDate.getDate()}}日
        <div>
          <button class="calender-button" @click="prev">上一月</button>
          <button class="calender-button" @click="prevD">前一天</button>
          <button class="calender-button" @click="current">本月</button>
          <button class="calender-button" @click="nextD">後一天</button>
          <button class="calender-button" @click="next">下一月</button>
        </div>
      </div>
      <ul class="calender-flex">
        <li v-for="str in '日一二三四五六'" :key="str">
          {{ str }}
        </li>
      </ul>
      <ul class="calender-flex calender-content">
        <li v-for="d in repairBefore" :key="d + 's'" class="calender-disabled">
          {{ d }}
        </li>
        <li
          v-for="d in monthDays"
          :key="d.getDate()"
          :class="{ 'calender-active': isToday(d),'calender-choosed':isChoosed(d)}"
          @click="chose(d)"
        >
          {{ d.getDate() }}
        </li>
        <li v-for="d in repairAfter" :key="d + 'a'" class="calender-disabled">
          {{ d }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      globalDate: new Date(),
      today: new Date(),
    };
  },
  computed: {
    monthDays() {
      let date = new Date(this.globalDate);
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      let totalDays = date.getDate();
      let res = [];
      for (let index = 1; index <= totalDays; index++) {
        let newDate = new Date(this.globalDate);
        newDate.setDate(index);
        res.push(newDate);
      }
      return res;
    },
    repairBefore() {
      let firstDay = new Date(this.globalDate);
      firstDay.setDate(1);
      let days = firstDay.getDay();
      let res = [];
      for (let index = 0; index < days; index++) {
        firstDay.setDate(firstDay.getDate() - 1);
        res.unshift(firstDay.getDate());
      }
      return res;
    },
    repairAfter() {
      let lastDay = new Date(this.globalDate);
      lastDay.setMonth(lastDay.getMonth() + 1);
      lastDay.setDate(0);
      let days = 6 - lastDay.getDay();
      return days;
    },
  },
  methods: {
    isToday(d) {
      return (
        this.today.getDate() === d.getDate() &&
        this.today.getMonth() === this.globalDate.getMonth() &&
        this.today.getFullYear() === this.globalDate.getFullYear()
      );
    },
    isChoosed(d){
      console.log(this.globalDate)
       return (
        this.globalDate.toString() === d.toString()
      );
    },
    prev() {
      this.globalDate = new Date(
        this.globalDate.setMonth(this.globalDate.getMonth() - 1)
      );
      console.log(this.globalDate);
    },
    next() {
      this.globalDate = new Date(
        this.globalDate.setMonth(this.globalDate.getMonth() + 1)
      );
    },
    prevD() {
      this.globalDate = new Date(
        this.globalDate.setDate(this.globalDate.getDate() - 1)
      );
    },
    nextD() {
      this.globalDate = new Date(
        this.globalDate.setDate(this.globalDate.getDate() + 1)
      );
    },
    current() {
      this.globalDate = new Date(this.today);
    },
    chose(d) {
      console.log(d);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.calender-flex {
  display: flex;
  flex-wrap: wrap;
}

.calender-flex-between {
  justify-content: space-between;
}

.calender-button + .calender-button {
  margin-left: 5px;
}

.calender-container {
  width: 420px;
  border: 1px solid #000;
  margin: 100px;
  li {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
.calender-content li {
  cursor: pointer;
  box-shadow: 0 0 1px #000;
  &.calender-active {
    background-color: rgb(7, 164, 255);
    color: #fff;
  }
  &.calender-choosed {
    background-color: rgb(201, 255, 7);
    color: #000;
  }
  &.calender-disabled {
    background: #ddd;
    color: #666;
    cursor: not-allowed;
  }
  &:hover {
    background-color: #eee;
  }
  &.calender-active:hover {
    background-color: rgb(9, 85, 129);
  }
}
</style>
