<template>
  <div class="content">
    <img src="/assets/img/avatar.png" width="135" height="135" class="avatar" />
  </div>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  //border-radius: 50%;
  //border: 5px solid var(--vp-avatar-border);
}

@keyframes avatar-transform {
  from {
    //transform: rotate(0);
  }
  to {
    //transform: rotate(360deg);
  }
}

.avatar:hover {
  //animation: 5s linear 0s infinite avatar-transform;
}
</style>
