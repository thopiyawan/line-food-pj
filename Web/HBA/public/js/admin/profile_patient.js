'use strict'
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const doctorId = urlParams.get('doctorId');

//console.log(userId)
$('#linkToDoctor').click(function () {
    window.open(`/admin/profile_doctor?doctorId=${doctorId}`, "_self");
})
$('#linkToAdmin').click(function () {
    window.open(`/admin`, "_self");
})

const db = firebase.firestore();

const date = moment().format('DD-MM-YYYY');
const dateNow = moment().add(543, 'years').format('Do MMMM YYYY');
const dateStart = moment().subtract(7, 'days').add(543, 'years').format('YYYY-MM-DD');
const dateEnd = moment().add(543, 'years').format('YYYY-MM-DD');
$('#dateStart').val(dateStart)
$('#dateEnd').val(dateEnd)
/*Check Auth*/
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // window.open('/public', "_self");
    } else {
        window.open('/', "_self");
    }
})

//Data Now
$('#txtDateNow').text(`วันที่ ${dateNow}`)

$(document).ready(function () {
    getProfile()
    getRatio()
    getGallery()
    getAverageResult()
    getTableKcal()
    getTableRatio()
    getComment()
    getHistoryWeight()

})

//Profile
function getProfile() {
    db.collection("users").doc(userId).collection("information").doc("profile").get().then(function (doc) {
        const name = `${doc.data().fullname} ${doc.data().lastname}`
        const gender = doc.data().gender
        const age = doc.data().age
        const weight = doc.data().weight
        const height = doc.data().height
        const bmi = doc.data().bmi
        const bmr = (doc.data().bmr).toFixed(2)
        const resultBmi = doc.data().resultBmi

        const img = document.createElement('img');
        img.src = doc.data().displayImage;
        img.setAttribute('class', 'card-img ');

        $('#profilePictureDiv').append(img);
        $('#txtName').text(name)
        $('#txtGender').text(gender)
        $('#txtAge').text(age)
        $('#txtWeight').text(weight)
        $('#txtHeight').text(height)
        $('#txtBmi').text(bmi)
        $('#txtBmr').text(bmr)

        /// BMI
        getBMI(bmi)
    })

}

//BMI
function getBMI(bmi) {
    //BMI
    am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        var container = am4core.create("chartdiv", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "vertical";
        createBulletChart(container, "solid");
        /* Create ranges */
        function createRange(axis, from, to, color) {
            var range = axis.axisRanges.create();
            range.value = from;
            range.endValue = to;
            range.axisFill.fill = color;
            range.axisFill.fillOpacity = 0.8;
            range.label.disabled = true;
            range.grid.disabled = true;
        }
        /* Create bullet chart with specified color type for background */
        function createBulletChart(parent, colorType) {
            var colors = ["#24abe2", "#3af901", "#fefb01", "#FF6611", "#F90D1B"];

            /* Create chart instance */
            var chart = container.createChild(am4charts.XYChart);
            chart.paddingRight = 25;

            /* Add data */
            chart.data = [{
                "category": "BMI",
                "value": bmi,
            }];

            /* Create axes */
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.grid.template.disabled = true;

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minGridDistance = 30;
            valueAxis.renderer.grid.template.disabled = true;
            valueAxis.min = 10;
            valueAxis.max = 50;
            valueAxis.strictMinMax = true;
            valueAxis.numberFormatter.numberFormat = "#";
            valueAxis.renderer.baseGrid.disabled = true;
            /* 
              In order to create separate background colors for each range of values, 
              you have to create multiple axisRange objects each with their own fill color 
            */
            if (colorType === "solid") {
                var start = 10,
                    end = 18.5;
                createRange(valueAxis, start, end, am4core.color(colors[0]));
                var start = 18.5,
                    end = 25;
                createRange(valueAxis, start, end, am4core.color(colors[1]));
                var start = 25,
                    end = 30;
                createRange(valueAxis, start, end, am4core.color(colors[2]));
                var start = 30,
                    end = 35;
                createRange(valueAxis, start, end, am4core.color(colors[3]));
                var start = 35,
                    end = 50;
                createRange(valueAxis, start, end, am4core.color(colors[4]));
            }
            /* Create series */
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = "value";
            series.dataFields.categoryY = "category";
            series.columns.template.fill = am4core.color("#000");
            series.columns.template.stroke = am4core.color("#fff");
            series.columns.template.strokeWidth = 1;
            series.columns.template.strokeOpacity = 0.5;
            series.columns.template.height = am4core.percent(25);
            series.tooltipText = "{value}"

            chart.cursor = new am4charts.XYCursor()
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;

            valueAxis.cursorTooltipEnabled = true;
            chart.arrangeTooltips = true;
        }
    }); // end am4core.ready()
}

//Ratio
function getRatio() {
    db.collection("users").doc(userId).collection("ratio-record").orderBy("timestamp", "desc").limit(1).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const dateRatio = moment(doc.id, 'DD-MM-YYYY').format('Do/MM/YYYY')
            const rice = doc.data().rice
            const fruits = doc.data().fruits
            const vegetable = doc.data().vegetable
            const milk = doc.data().milk
            const meat = doc.data().meat
            const fat = doc.data().fat
            const sugar = doc.data().sugar
            const sodium = doc.data().sodium
            const kcal = doc.data().bmr

            $('#txtDateRatio').text(dateRatio)
            $('#txtRatioRice').text(rice)
            $('#txtRatioFruits').text(fruits)
            $('#txtRatioVegetable').text(vegetable)
            $('#txtRatioMilk').text(milk)
            $('#txtRatioMeat').text(meat)
            $('#txtRatioFat').text(fat)
            $('#txtRatioSugar').text(sugar)
            $('#txtRatioSodium').text(sodium)
            $('#txtRatioKcal').text(kcal)

            $('#inputRatioRice').val(rice)
            $('#inputRatioFruits').val(fruits)
            $('#inputRatioVegetable').val(vegetable)
            $('#inputRatioMilk').val(milk)
            $('#inputRatioMeat').val(meat)
            $('#inputRatioFat').val(fat)
            $('#inputRatioSugar').val(sugar)
            $('#inputRatioSodium').val(sodium)
            $('#inputRatioKcal').val(kcal)

            $('#btnUpdateRatio').click(async function () {
                Swal.fire({
                    icon: 'warning',
                    title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
                    showConfirmButton: false,
                    timer: 20000
                })


                const rice = $('#inputRatioRice').val()
                const fruits = $('#inputRatioFruits').val()
                const vegetable = $('#inputRatioVegetable').val()
                const milk = $('#inputRatioMilk').val()
                const meat = $('#inputRatioMeat').val()
                const fat = $('#inputRatioFat').val()
                const sugar = $('#inputRatioSugar').val()
                const sodium = $('#inputRatioSodium').val()
                try {
                    var gender
                    var age
                    var weight
                    var height
                    await db.collection("users").doc(userId).collection("information").doc("profile").get().then(function (doc) {
                        gender = doc.data().gender
                        age = doc.data().age
                        weight = doc.data().weight
                        height = doc.data().height
                    })
                    const obj = {
                        timestamp: new Date().getTime(),
                        rice: rice,
                        fruits: fruits,
                        vegetable: vegetable,
                        milk: milk,
                        meat: meat,
                        fat: fat,
                        sugar: sugar,
                        sodium: sodium,
                        bmr: calBMR(height, weight, age, gender),
                    }

                    await db.collection("users").doc(userId).collection("ratio-record").doc(date).set(
                        obj
                    ).then(function () {
                        Swal.fire({
                            icon: 'success',
                            title: '<h5>บันทึกข้อมูลสำเร็จ!</h5>',
                        }).then(function () {
                            getRatio()
                            $('#ratioModal').modal('hide')
                        })
                    })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: error,
                    })
                }
            })
        });
    })
}

function calBMR(height, weight, age, gender) {
    if (gender == 'ชาย') {
        const result = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
        return result
    } else {
        const result = 665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
        return result
    }
}


// Gallaery
const TABLE_MEAL = 
`
<tr>
    <th id="txtDateMeal"></th>
    <td id="txtNameMeal"></td>
</tr>
`
//ดึงรูปอาหารทั้งหมดที่ผู้ป่วยกิน
function getGallery() {
    db.collection("users").doc(userId).collection("diary").orderBy("timestamp", "desc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const meal = ['breakfast', 'morningsnack', 'lunch', 'afterrnoonsnack', 'dinner', 'beforebed'];
            for (let i = 0; i < meal.length; i++) {
                db.collection("users").doc(userId).collection("diary").doc(doc.id).collection(meal[i]).get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.data().image != "https://firebasestorage.googleapis.com/v0/b/hba-project-db81d.appspot.com/o/icon%2FFlex%2Ffood_default.png?alt=media&token=b0ccb88b-8aec-4b50-98be-225241dc1870") {
                            const div = document.createElement('div');
                            div.alt = 'class', 'grid-item'
                            $('#imgFood').append(div)
                            const img = document.createElement('img');
                            img.src = doc.data().image;
                            div.append(img);
                        }
                        const tr = $(TABLE_MEAL)
                        const dataTH = moment(doc.data().date, 'DD-MM-YYYY').add(543, 'years').format('Do/MM/YYYY')
                        tr.find('#txtDateMeal').text(dataTH)
                        tr.find('#txtNameMeal').text(doc.data().foodname)
                        $('#tableHistoryMeal').append(tr)
                    });
                });
            }
        });
    });
}

//ดึงค่าเฉลี่ยสัดส่วนทั้งหมด
async function getAverageResult() {
    var day = []
    var daySum
    var kcalSum = 0
    var kcalCarboSum = 0
    var kcalProteinSum = 0
    var kcalFatSum = 0
    var rice = 0
    var fruits = 0
    var vegetable = 0
    var sugar = 0
    var milk = 0
    var meat = 0
    var fat = 0
    var kcalText = []
    try {
        await db.collection("users").doc(userId).collection("diary").orderBy("timestamp", "asc").get().then(function (querySnapshot) {
            daySum = querySnapshot.size
            querySnapshot.forEach(function (doc) {
                day.push(doc.id)
            });
        });
        for (let i = 0; i < day.length; i++) {
            await db.collection("users").doc(userId).collection("diary").doc(day[i]).collection("history").doc("total").get().then(function (doc) {
                rice += doc.data().rice
                fruits += doc.data().fruits
                vegetable += doc.data().vegetable
                sugar += doc.data().sugar
                milk += doc.data().milk
                meat += doc.data().meat
                fat += doc.data().fat

                kcalSum += doc.data().kcal
                kcalCarboSum += doc.data().kcalCarbo
                kcalProteinSum += doc.data().kcalProtein
                kcalFatSum += doc.data().kcalFat
                const obj = {
                    "date": day[i],
                    "value": doc.data().kcal
                }
                kcalText.push(obj)
            })
        }
        const perCarbo = ((kcalCarboSum * 100) / kcalSum).toFixed(2)
        const perProtein = ((kcalProteinSum * 100) / kcalSum).toFixed(2)
        const perFat = ((kcalFatSum * 100) / kcalSum).toFixed(2)
        const kcalAvg = (kcalSum / daySum).toFixed(2)
        $('#txtKcalCarboResultAvg').text(perCarbo)
        $('#txtKcalProteinResultAvg').text(perProtein)
        $('#txtKcalFatResultAvg').text(perFat)
        $('#txtKcalResultAvg').text(kcalAvg)

        //getChartResultKcal(perCarbo, perProtein, perFat)

        getChartDayKcal(kcalText)
        getChartResultCarbo(rice, fruits, vegetable, sugar)
        getChartResultProtein(milk, meat)
        getChartResultFat(fat)
    } catch (error) {
        console.log(error)
    }
}

const TABLE_KCAL_TEMPLATE =
    `<tr class="table text-center">
        <th><h6 id="txtKcalDate"></h6></th>
        <td><h6 id="txtKcalCarbo"></h6></td>
        <td><h6 id="txtKcalProtein"></h6></td>
        <td><h6 id="txtKcalFat"></h6> </td>
        <td><h6 id="txtKcalTotal"></h6></td>
        <td><h6 id="txtKcalBalance"></h6></td>
        <td><button type="button" class="btn btn-secondary btn-sm" id="btnHistory" >ดูรายละเอียด</button></td>
    </tr>`

function getTableKcal() {
    db.collection("users").doc(userId).collection("diary").orderBy("timestamp", "desc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const tr = $(TABLE_KCAL_TEMPLATE)
            const dateKcal = doc.data().date
            const dataKcalTH = moment(dateKcal, 'DD-MM-YYYY').add(543, 'years').format('Do/MM/YYYY')
            tr.find('#txtKcalDate').text(dataKcalTH)

            db.collection("users").doc(userId).collection('diary').doc(dateKcal).collection('history').doc('total').get().then(function (doc) {
                const perCarbo = ((doc.data().kcalCarbo * 100) / doc.data().kcal).toFixed(2)
                const perProtein = ((doc.data().kcalProtein * 100) / doc.data().kcal).toFixed(2)
                const perFat = ((doc.data().kcalFat * 100) / doc.data().kcal).toFixed(2)
                tr.find('#txtKcalCarbo').text(`${perCarbo}% (${doc.data().kcalCarbo})`)
                tr.find('#txtKcalProtein').text(`${perProtein}% (${doc.data().kcalProtein})`)
                tr.find('#txtKcalFat').text(`${perFat}% (${doc.data().kcalFat})`)
                tr.find('#txtKcalTotal').text((doc.data().kcal).toFixed(2))
                tr.find('#btnHistory').click(function () {
                    window.open(`/admin/history_patient?doctorId=${doctorId}&userId=${userId}&date=${dateKcal}`, "_self");
                })
            })

            db.collection("users").doc(userId).collection('diary').doc(dateKcal).collection('history').doc('balance').get().then(function (doc) {
                const balanceKcal = doc.data().kcal
                if (balanceKcal < 0) {
                    txtKcalBalance = `+ ${(balanceKcal * -1).toFixed(2)}`
                } else if (balanceKcal == 0) {
                    txtKcalBalance = (balanceKcal).toFixed(2)
                } else {
                    txtKcalBalance = `- ${(balanceKcal).toFixed(2)}`
                }
                tr.find('#txtKcalBalance').text(txtKcalBalance)
            })

            $('#tb-kcal').append(tr)
        })
    })
}

const TABLE_RATIO_TEMPLATE =
    `<tr class="table text-center">
        <th ><h6 id="txtRatioDate"></h6> </th>
        <td id="tdRatioRice"><h6 id="txtRatioRice"></h6></td>
        <td id="tdRatioFruits" ><h6 id="txtRatioFruits"></h6></td>
        <td id="tdRatioVegetable" ><h6 id="txtRatioVegetable"></h6></td>
        <td id="tdRatioMilk" ><h6 id="txtRatioMilk"></h6></td>
        <td id="tdRatioMeat" ><h6 id="txtRatioMeat"></h6></td>
        <td id="tdRatioFat" ><h6 id="txtRatioFat"></h6></td>
        <td id="tdRatioSugar" ><h6 id="txtRatioSugar"></h6></td>
        <td id="tdRatioSodium" ><h6 id="txtRatioSodium"></h6></td>
        <td><h6 id="txtRatioKcal"></h6></td>
        <td><button class="btn btn-sm btn-secondary" id="btnHistory">ดูรายละเอียด</button></td>
    </tr>`


//ตารางสัดส่วนแบบหมวด โปรตีน คาร์โบ ไขมัน
function getTableRatio() {
    db.collection("users").doc(userId).collection("diary").orderBy("timestamp", "desc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const tr = $(TABLE_RATIO_TEMPLATE)
            const dateRatio = doc.data().date
            const dateRatioTH = moment(dateRatio, 'DD-MM-YYYY').add(543, 'years').format('Do/MM/YYYY')
            tr.find('#txtRatioDate').text(dateRatioTH)
            db.collection("users").doc(userId).collection('diary').doc(dateRatio).collection('history').doc('total').get().then(function (doc) {
                const rice = doc.data().rice
                const fruits = doc.data().fruits
                const vegetable = doc.data().vegetable
                const milk = doc.data().milk
                const meat = doc.data().meat
                const fat = doc.data().fat
                const sugar = doc.data().sugar
                const sodium = doc.data().sodium

                tr.find('#txtRatioRice').text(rice)
                tr.find('#txtRatioFruits').text(fruits)
                tr.find('#txtRatioVegetable').text(vegetable)
                tr.find('#txtRatioMilk').text(milk)
                tr.find('#txtRatioMeat').text(meat)
                tr.find('#txtRatioFat').text(fat)
                tr.find('#txtRatioSugar').text(sugar)
                tr.find('#txtRatioSodium').text(sodium)
                tr.find('#txtRatioKcal').text(doc.data().kcal)
                tr.find('#btnHistory').click(function () {
                    window.open(`/admin/history_patient?doctorId=${doctorId}&userId=${userId}&date=${dateRatio}`, "_self");
                })
            })
            db.collection("users").doc(userId).collection('diary').doc(dateRatio).collection('history').doc('balance').get().then(function (doc) {
                const rice = doc.data().rice
                const fruits = doc.data().fruits
                const vegetable = doc.data().vegetable
                const milk = doc.data().milk
                const meat = doc.data().meat
                const fat = doc.data().fat
                const sugar = doc.data().sugar
                const sodium = doc.data().sodium

                if (rice < 0) { tr.find('#tdRatioRice').attr('bgcolor', '#ED6F5B') }
                if (fruits < 0) { tr.find('#tdRatioFruits').attr('bgcolor', '#ED6F5B') }
                if (vegetable < 0) { tr.find('#tdRatioVegetable').attr('bgcolor', '#ED6F5B') }
                if (milk < 0) { tr.find('#tdRatioMilk').attr('bgcolor', '#ED6F5B') }
                if (meat < 0) { tr.find('#tdRatioMeat').attr('bgcolor', '#ED6F5B') }
                if (fat < 0) { tr.find('#tdRatioFat').attr('bgcolor', '#ED6F5B') }
                if (sugar < 0) { tr.find('#tdRatioSugar').attr('bgcolor', '#ED6F5B') }
                if (sodium < 0) { tr.find('#tdRatioSodium').attr('bgcolor', '#ED6F5B') }
            })

            $('#tb-date').append(tr)
        })
    })
}

// //logout button
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
})


const TABLE_COMMENT_TEMPLATE =
    `
    <tr>
        <th id="txtDateComment"></th>
        <td id="txtTimeComment"></td>
        <td id="txtComment"></td>
    </tr>
`
//คำแนะนำจากผู้เชี่ยวชาญทั้งหมด
function getComment() {
    db.collection("users").doc(userId).collection('comment').orderBy("timestamp", "desc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const comment = doc.data().comment

            const dateComment = moment(doc.data().date, 'DD-MM-YYYY').format('DD/MM/YYYY')
            const timeComment = moment(doc.data().timestamp).locale("th").format('HH:mm')

            const tableComment = $(TABLE_COMMENT_TEMPLATE)
            tableComment.find('#txtDateComment').text(dateComment)
            tableComment.find('#txtTimeComment').text(timeComment)
            tableComment.find('#txtComment').text(comment)
            $('#tableComment').append(tableComment)
        });
    });
}


//Send Message
btnSendMessage.addEventListener('click', async e => {
    const comment = $('#comment').val()
    if (!comment) {
        Swal.fire({
            icon: 'error',
            title: '<h6>กรุณาใส่คำแนะนำ..</h6>',
        })
    } else {
        Swal.fire({
            icon: 'warning',
            title: '<h6>รอสักครู่กำลังบันทึกข้อมูล..</h6>',
            showConfirmButton: false,
            timer: 20000
        })
        try {
            await db.collection("users").doc(userId).collection('comment').doc(date).set({
                timestamp: new Date().getTime(),
                comment: comment,
                date: date
            })
            Swal.fire({
                icon: 'success',
                title: '<h5>เพิ่มคำแนะนำสำเร็จ!</h5>',
            })
            $('#modalComment').modal('hide')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
            })
        }
    }


    console.log(comment)
})


function getChartDayKcal(kcal) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartDayKcal", am4charts.XYChart);

        // Add data
        chart.data = kcal;

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "dd-MM-yyyy";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"
        series.strokeWidth = 2;
        series.minBulletDistance = 15;

        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";

        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        dateAxis.start = 0.79;
        dateAxis.keepSelection = false;


    }); // end am4core.ready()

}

function getChartResultCarbo(rice, fruits, vegetable, sugar) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartResultCarbo", am4charts.PieChart);

        // Add data
        chart.data = [{
            "country": "ข้าว-แป้ง",
            "litres": rice
        }, {
            "country": "ผลไม้",
            "litres": fruits
        }, {
            "country": "ผัก",
            "litres": vegetable
        }, {
            "country": "น้ำตาล",
            "litres": sugar
        }];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

    }); // end am4core.ready()
}
function getChartResultProtein(milk, meat) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartResultProtein", am4charts.PieChart);

        // Add data
        chart.data = [{
            "country": "นม",
            "litres": milk
        }, {
            "country": "เนื้อสัตว์",
            "litres": meat
        }];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

    }); // end am4core.ready()
}
function getChartResultFat(fat) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartResultFat", am4charts.PieChart);

        // Add data
        chart.data = [{
            "country": "ไขมัน",
            "litres": fat
        }];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

    }); // end am4core.ready()
}
function getHistoryWeight() {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdivweight", am4charts.XYChart);

        // Add data
        chart.data = [{
            "date": "2012-07-27",
            "value": 13
        }, {
            "date": "2012-07-28",
            "value": 11
        }, {
            "date": "2012-07-29",
            "value": 15
        }, {
            "date": "2012-07-30",
            "value": 16
        }];

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"
        series.strokeWidth = 2;
        series.minBulletDistance = 15;

        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";

        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        dateAxis.start = 0.79;
        dateAxis.keepSelection = true;


    }); // end am4core.ready()
}

async function getHistoryWeight() {
    var weight = []
    try {
        await db.collection("users").doc(userId).collection('heigthweigth-record').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const obj = {
                    "date": doc.id,
                    "value": doc.data().weight
                }
                weight.push(obj)
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
            });
        });
    } catch (error) {
        console.log(error)
    }

    getChartWeight(weight)

}
//Chart ประวัติน้ำหนัก
function getChartWeight(weight) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdivwight", am4charts.XYChart);

        // Add data
        chart.data = weight;

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "dd-MM-yyyy";

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"
        series.strokeWidth = 2;
        series.minBulletDistance = 15;

        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";

        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        dateAxis.start = 0.79;
        dateAxis.keepSelection = false;


    }); // end am4core.ready()
}
//ปุ่มเลือกวันที่ต้องการดูย้อนหลัง
btnSlectDate.addEventListener('click', e => {
    
    const inputdateStart = $('#dateStart').val()
    const inputdateEnd = $('#dateEnd').val()

    const dateStart = moment(inputdateStart).subtract(543, 'years').format('YYYY-MM-DD');
    const dateEnd = moment(inputdateEnd).subtract(543, 'years').format('YYYY-MM-DD');
    window.open(`/admin/record_patient?doctorId=${doctorId}&userId=${userId}&dateStart=${dateStart}&dateEnd=${dateEnd}`, "_self");
})