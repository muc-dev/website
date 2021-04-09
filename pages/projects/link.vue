<template>
  <section>
    <page-header size="small" />
    <div style="width:450px">
      <linked-demo />
    </div>
  </section>
</template>

<script>
import PageHeader from "@/components/page-header"
import LinkedDemo from "@/components/linked-demo"

export default {
  layout: 'empty',
  components: {
    PageHeader,
    LinkedDemo
  }
}
</script>
