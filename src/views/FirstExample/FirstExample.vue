<template>
  <div class="first-example">
    <v-card class="section-card">
      <v-card-title>
        FirstExample y=kx+b训练
      </v-card-title>
      <v-card-text>
        <a href="https://www.bilibili.com/video/BV1Pg4y187c4?t=4&p=6">视频链接</a>
      </v-card-text>
      <v-card-text>
        <v-text-field label="x" v-model="x" type="number"></v-text-field>
        <v-text-field label="y" v-model="y" type="number"></v-text-field>
        <v-btn color="primary" @click="onAddClick">添加</v-btn>
        <div>
          xs: {{xs}}
        </div>
        <div>
          ys: {{ys}}
        </div>
        <v-text-field label="epochs" v-model="epochs"></v-text-field>
        <v-btn color="primary" @click="onStartClick">开始训练</v-btn>
      </v-card-text>
    </v-card>
    <v-card class="section-card">
      <v-card-title>预测</v-card-title>
      <v-card-text>
        <v-text-field label="x" v-model="testX" type="number"></v-text-field>
        <v-btn color="primary" @click="onTestClick">预测</v-btn>
        <div>结果: {{testY}}</div>
      </v-card-text>
    </v-card>
    <v-card class="section-card">
      <v-card-title>保存模型</v-card-title>
      <v-card-text>
        <v-btn color="primary" @click="onSaveModelClick">保存</v-btn>
      </v-card-text>
    </v-card>
    <v-card class="section-card">
      <v-card-title>日志</v-card-title>
      <v-card-text>
        <div class="train-log">
          <div v-for="log in logs" :key="log.logId">Epoch: {{log.epoch}} Loss: {{log.loss}}</div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import * as tf from '@tensorflow/tfjs';
  import {TrainLog} from "@/views/FirstExample/TrainLog";


  @Component({
    components: {}
  })
  export default class FirstExample extends Vue {
    y: string = ""
    x: string = ""
    xs: number[] = []
    ys: number[] = []
    epochs: string = ""
    logId: number = 0
    logs: TrainLog[] = []
    model!: tf.Sequential
    testX: string = ""
    testY: String = ""

    mounted() {
      this.initModel()
    }

    initModel() {
      const model = tf.sequential()
      model.add(tf.layers.dense({units: 1, inputShape: [1]}))
      model.compile({loss: "meanSquaredError", optimizer: tf.train.adam(0.05)})
      model.summary()
      this.model = model
    }

    onAddClick() {
      this.xs.push(parseFloat(this.x))
      this.ys.push(parseFloat(this.y))
    }

    onStartClick() {
      const xs = tf.tensor2d(this.xs, [this.xs.length, 1])
      const ys = tf.tensor2d(this.ys, [this.ys.length, 1])
      this.doTraining(this.model, xs, ys, parseInt(this.epochs))
    }

    async doTraining(model: tf.Sequential, xs: tf.Tensor2D, ys: tf.Tensor2D, epochs: number) {
      console.log("start train")
      await model.fit(xs, ys, {
        shuffle: true,
        epochs: epochs,
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            console.log(`Epoch: ${epoch} Loss: ${logs!.loss}`)
            this.logs.unshift({
              epoch: epoch,
              loss: logs!.loss,
              logId: this.logId++
            })
          }
        }
      })
    }

    onTestClick() {
      const x = parseFloat(this.testX)
      this.testY = this.model.predict(tf.tensor2d([x], [1, 1])).toString()
    }

    async onSaveModelClick() {
      await this.model.save('downloads://my-model')
    }

  }

</script>

<style scoped>
  .first-example {
    padding: 16px;
  }

  .section-card {
    margin: 16px;
  }

  .train-log {
    max-height: 200px;
    overflow: auto;
  }

</style>
