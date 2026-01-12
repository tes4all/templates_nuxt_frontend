.PHONY: sync

sync:
	rsync -av --progress --exclude='.git' --exclude='node_modules' . $(DEST)
