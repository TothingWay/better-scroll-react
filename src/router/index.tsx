import App from '../App'
import CoreEntry from '../pages/CoreEntry'
import ObserveDOMEntry from '../pages/ObserveDOMEntry'
import SlideEntry from '../pages/SlideEntry'
import ZoomEntry from '../pages/ZoomEntry'
// import PickerEntry from '../pages/picker-entry'
// import PullupEntry from '../pages/pullup-entry'
// import PullDownEntry from '../pages/pulldown-entry'
// import ScrollBarEntry from '../pages/scrollbar-entry'
// import InfinityScrollEntry from '../pages/infinity-entry'
// import FormEntry from '../pages/form-entry'
// import NestedScrollEntry from '../pages/nested-scroll-entry'
// import MovableEntry from '../pages/movable-entry'
// import MouseWheelEntry from '../pages/mouse-wheel-entry'
// import ComposeEntry from '../pages/compose-entry'

// import MouseWheelVerticalScroll from '../components/mouse-wheel/vertical-scroll'
// import MouseWheelHorizontalScroll from '../components/mouse-wheel/horizontal-scroll'
// import MouseWheelVerticalSlide from '../components/mouse-wheel/vertical-slide'
// import MouseWheelHorizontalSlide from '../components/mouse-wheel/horizontal-slide'
// import MouseWheelPullUp from '../components/mouse-wheel/pullup'
// import MouseWheelPullDown from '../components/mouse-wheel/pulldown'
// import MouseWheelPicker from '../components/mouse-wheel/picker'

import BannerSlide from '../components/Slide/Banner'
import PageSlide from '../components/Slide/Fullpage'
import VerticalSlide from '../components/Slide/Vertical'

import VerticalScroll from '../components/Core/Default'
import HorizontalScroll from '../components/Core/Horizontal'
import DynamicContentScroll from '../components/Core/DynamicContentScroll'
import SpecifiedContentScroll from '../components/Core/SpecifiedContentScroll'
import Freescroll from '../components/Core/Freescroll'

// import OneColumnPicker from '../components/picker/one-column'
// import DoubleColumnPicker from '../components/picker/double-column'
// import LinkageColumnPicker from '../components/picker/linkage-column'

// import FormTextarea from '../components/form/textarea'

// import NestedVerticalScroll from '../components/nested-scroll/vertical'
// import NestedHorizontalScroll from '../components/nested-scroll/horizontal'
// import NestedHorizontalInVertical from '../components/nested-scroll/horizontal-in-vertical'

// import Movable from '../components/movable/default'
// import MovableScale from '../components/movable/scale'

// import ComposePullUpPullDown from '../components/compose/pullup-pulldown'
// import ComposePullUpPullDownSlide from '../components/compose/pullup-pulldown-slide'
// import ComposePullUpPullDownNested from '../components/compose/pullup-pulldown-outnested'
// import ComposeSlideNested from '../components/compose/slide-nested'

export default [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/core',
        component: CoreEntry,
        key: 'CoreEntry',
        routes: [
          {
            path: '/core/default',
            component: VerticalScroll,
            key: 'VerticalScroll',
          },
          {
            path: '/core/horizontal',
            component: HorizontalScroll,
            key: 'HorizontalScroll',
          },
          {
            path: '/core/dynamic-content',
            component: DynamicContentScroll,
            key: 'DynamicContentScroll',
          },
          {
            path: '/core/specified-content',
            component: SpecifiedContentScroll,
            key: 'SpecifiedContentScroll',
          },
          {
            path: '/core/freescroll',
            component: Freescroll,
            key: 'Freescroll',
          },
        ],
      },
      {
        path: '/observe-dom',
        component: ObserveDOMEntry,
        key: 'ObserveDOMEntry',
      },
      {
        path: '/slide',
        component: SlideEntry,
        key: 'SlideEntry',
        routes: [
          {
            path: '/slide/banner',
            component: BannerSlide,
            key: 'BannerSlide',
          },
          {
            path: '/slide/fullpage',
            component: PageSlide,
            key: 'PageSlide',
          },
          {
            path: '/slide/vertical',
            component: VerticalSlide,
            key: 'VerticalSlide',
          },
        ],
      },
      {
        path: '/zoom',
        component: ZoomEntry,
        key: 'ZoomEntry',
      },
    ],
  },
]
