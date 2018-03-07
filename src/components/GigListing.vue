<template>
<div class="gig-listing">
  <div class="year">{{date.year}}</div>
  <div class="date-container">
    {{date.day}}<br> 
    {{date.month}}<br>
    <span class="date-number">{{date.dayOfMonth}}</span>
  </div>
  <div class="gig-details-container">
    <span class="city-and-venue">
      <span class="city">
        {{showDetails.city}}
      </span> <br>
      {{showDetails.venue}}
    </span> <br>
    <span style="opacity: 70%; font-size: 0.9em">
        {{showDetails.fullAddress}}
        <br>
        {{showDetails.phone}}
    </span>
    <span class="buy-tickets">
      <a :href="showDetails.url">
        Buy Tickets
      </a>
    </span>
  </div>
</div>
</template>

<script>
export default {
	data() {
		return {
			date: {},
			showDetails: {
				venue: this.show[1],
				description: this.show[2],
				phone: this.show[3],
				url: this.show[4],
				city: this.show[5],
				fullAddress: this.show[6]
			}
		}
	},
	props: ['show'],
	methods: {
		processDate(date) {
			const strDate = new Date(date.replace(/-/g, '/')).toDateString()
			const year = strDate.substring(strDate.length - 4)
			return {
				year: strDate.substring(strDate.length - 4),
				day: strDate.substr(0, 3),
				month: strDate.substr(4, 3),
				dayOfMonth: strDate.substr(8, 2)
			}
		}
	},
	mounted() {
		this.date = this.processDate(this.show[0])
	}
}
</script>

<style scoped>
.gig-listing {
	margin-left: 10px;
	min-height: 80px;
	height: auto;
	font-size: 16px;
	padding-top: 10px;
	border: #4b3849 solid 1px;
	margin-bottom: 10px;
	padding-bottom: 20px;
}
.year {
	transform: rotate(270deg) translate(-18px, -2px);
	display: block;
	position: absolute;
	font-size: 22px;
	float: left;
	color: #939393;
}
.date-container {
	padding: 5px 15px 2px 15px;
	border: 0px solid #888;
	text-align: center;
	font-weight: bold;
	float: left;
	margin-left: 20px;
	margin-bottom: 10px;
}
.gig-details-container {
	padding-left: 2px;
	padding-top: 5px;
	float: none;
	text-align: left;
}
.buy-tickets {
	font-family: 'brandon-grotesque', sans-serif;
	color: #fff;
	font-weight: bold;
	border: 0;
	padding: 10px 15px;
	float: right;
	margin: 2px;
	background-color: #4b3849;
	font-size: 11px;
	font-weight: 700;
}
.buy-tickets > a {
	color: #fff;
}
</style>
