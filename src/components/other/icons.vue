<style lang='less'>
  .icons-choose-vue {
    overflow-y: auto;
    .h-row>div>div {
      background: rgb(240, 246, 255);
      border-radius: 3px;
      padding: 20px 5px;
      text-align: center;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      [class^="icon-"], [class*=" icon-"]{
        font-size: 28px;
      }
      [class^="h-icon"], [class*=" h-icon"]{
        font-size: 28px;
      }
      p{
        margin: 10px 0px;
      }
    }
  }
</style>
<template>
  <div class="icons-choose-vue h-panel frame-page" ref="icons">

    <div class="h-panel-body">
      <Row :space="16">
        <Cell v-for='n of icons' :xs='16' :sm='16' :md='8' :lg='6' :xl='4' :key="n">
          <div style="cursor: pointer">
            <p><i :class="n"></i></p>
            <p>{{n}}</p>
          </div>
        </Cell>
      </Row>

    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      icons: [
        'icon-eye',
        'icon-paper-clip',
        'icon-mail',
        'icon-toggle',
        'icon-layout',
        'icon-link',
        'icon-bell',
        'icon-lock',
        'icon-unlock',
        'icon-ribbon',
        'icon-image',
        'icon-signal',
        'icon-target',
        'icon-clipboard',
        'icon-clock',
        'icon-watch',
        'icon-air-play',
        'icon-camera',
        'icon-video',
        'icon-disc',
        'icon-printer',
        'icon-monitor',
        'icon-server',
        'icon-cog',
        'icon-heart',
        'icon-paragraph',
        'icon-align-justify',
        'icon-align-left',
        'icon-align-center',
        'icon-align-right',
        'icon-book',
        'icon-layers',
        'icon-stack',
        'icon-stack-2',
        'icon-paper',
        'icon-paper-stack',
        'icon-search',
        'icon-zoom-in',
        'icon-zoom-out',
        'icon-reply',
        'icon-circle-plus',
        'icon-circle-minus',
        'icon-circle-check',
        'icon-circle-cross',
        'icon-square-plus',
        'icon-square-minus',
        'icon-square-check',
        'icon-square-cross',
        'icon-microphone',
        'icon-record',
        'icon-skip-back',
        'icon-rewind',
        'icon-play',
        'icon-pause',
        'icon-stop',
        'icon-fast-forward',
        'icon-skip-forward',
        'icon-shuffle',
        'icon-repeat',
        'icon-folder',
        'icon-umbrella',
        'icon-moon',
        'icon-thermometer',
        'icon-drop',
        'icon-sun',
        'icon-cloud',
        'icon-cloud-upload',
        'icon-cloud-download',
        'icon-upload',
        'icon-download',
        'icon-location',
        'icon-location-2',
        'icon-map',
        'icon-battery',
        'icon-head',
        'icon-briefcase',
        'icon-speech-bubble',
        'icon-anchor',
        'icon-globe',
        'icon-box',
        'icon-reload',
        'icon-share',
        'icon-marquee',
        'icon-marquee-plus',
        'icon-marquee-minus',
        'icon-tag',
        'icon-power',
        'icon-command',
        'icon-alt',
        'icon-esc',
        'icon-bar-graph',
        'icon-bar-graph-2',
        'icon-pie-graph',
        'icon-star',
        'icon-arrow-left',
        'icon-arrow-right',
        'icon-arrow-up',
        'icon-arrow-down',
        'icon-volume',
        'icon-mute',
        'icon-content-right',
        'icon-content-left',
        'icon-grid',
        'icon-grid-2',
        'icon-columns',
        'icon-loader',
        'icon-bag',
        'icon-ban',
        'icon-flag',
        'icon-trash',
        'icon-expand',
        'icon-contract',
        'icon-maximize',
        'icon-minimize',
        'icon-plus',
        'icon-minus',
        'icon-check',
        'icon-cross',
        'icon-move',
        'icon-delete',
        'icon-menu',
        'icon-archive',
        'icon-inbox',
        'icon-outbox',
        'icon-file',
        'icon-file-add',
        'icon-file-subtract',
        'icon-help',
        'icon-open',
        'icon-ellipsis',
        'h-icon-info',
        'h-icon-warn',
        'h-icon-success',
        'h-icon-error',
        'h-icon-close',
        'h-icon-down',
        'h-icon-left',
        'h-icon-top',
        'h-icon-right',
        'h-icon-inbox',
        'h-icon-outbox',
        'h-icon-plus',
        'h-icon-minus',
        'h-icon-check',
        'h-icon-loading',
        'h-icon-spinner',
        'h-icon-completed',
        'h-icon-refresh',
        'h-icon-home',
        'h-icon-user',
        'h-icon-users',
        'h-icon-task',
        'h-icon-message',
        'h-icon-fullscreen',
        'h-icon-menu',
        'h-icon-link',
        'h-icon-edit',
        'h-icon-trash',
        'h-icon-complete',
        'h-icon-bell',
        'h-icon-search',
        'h-icon-star',
        'h-icon-star-on',
        'h-icon-setting',
        'h-icon-calendar',
        'h-icon-upload',
        'h-icon-github',
        'h-icon-location',
        'h-icon-help',
        'h-icon-help-solid',
        'h-icon-lock',
        'h-icon-angle-left',
        'h-icon-angle-right',
        'h-icon-angle-top',
        'h-icon-angle-down',
        'h-icon-close-min'
      ]
    };
  },
  mounted () {
    this.$refs.icons.style.height = (document.body.clientHeight*0.8)+'px';
  },
  methods: {
  },
  computed: {
  }
};
</script>
