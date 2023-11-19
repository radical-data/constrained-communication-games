<script lang="ts">
	import { users } from "../stores";
</script>

<h1>Constrained Communication Games</h1>
<p>A playground to train for building connection in places built for the opposite.</p>
<p>There {($users.length === 1) ? 'is' : `are`} {$users.length} {($users.length === 1) ? 'user' : `users`} online.</p>
<a href="chat">Enter a chat</a>
