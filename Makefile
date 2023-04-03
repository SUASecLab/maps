M4 := m4

maps : $(GIL_DEPS) $(HEAVEN_DEPS) $(HACKING_DEPS) \
	$(RC3_DEPS) $(RELAXATION_DEPS) $(WORK_DEPS)
	@$(MAKE) $(GIL_TARGET)
	@$(MAKE) $(HACKING_TARGET)
	@$(MAKE) $(HEAVEN_TARGET)
	@$(MAKE) $(RC3_TARGET)
	@$(MAKE) $(RELAXATION_TARGET)
	@$(MAKE) $(WORK_TARGET)

GIL_TARGET := gil/script.js
GIL_TEMPLATE := script_snippets/templates/gil.m4
GIL_DEPS := script_snippets/api/init.m4 \
	script_snippets/api/room.m4 \
	script_snippets/util/bbb.m4 \
	script_snippets/util/cleanup.m4 \
	script_snippets/util/tips.m4 \
	$(GIL_TEMPLATE)

$(GIL_TARGET) : $(GIL_DEPS)
	$(M4) $(GIL_TEMPLATE) > $(GIL_TARGET)

HACKING_TARGET := hacking/script.js
HACKING_TEMPLATE := script_snippets/templates/hacking.m4
HACKING_DEPS := script_snippets/api/init.m4 \
	script_snippets/api/nav.m4 \
	script_snippets/api/room.m4 \
	script_snippets/api/ui.m4 \
	script_snippets/composite/forloop2.m4 \
	script_snippets/util/workplaces.m4 \
	script_snippets/util/cleanup.m4 \
	script_snippets/util/tips.m4 \
	$(HACKING_TEMPLATE)
$(HACKING_TARGET) : $(HACKING_DEPS)
	$(M4) $(HACKING_TEMPLATE) > $(HACKING_TARGET)

HEAVEN_TARGET := heaven/script.js
HEAVEN_TEMPLATE := script_snippets/templates/heaven.m4
HEAVEN_DEPS := script_snippets/api/init.m4 \
	script_snippets/api/nav.m4 \
	script_snippets/api/room.m4 \
	script_snippets/api/ui.m4 \
	script_snippets/composite/forloop2.m4 \
	script_snippets/util/bbb.m4 \
	script_snippets/util/workplaces.m4 \
	script_snippets/util/cleanup.m4 \
	script_snippets/util/tips.m4 \
	$(HEAVEN_TEMPLATE)

$(HEAVEN_TARGET) : $(HEAVEN_DEPS)
	$(M4) $(HEAVEN_TEMPLATE) > $(HEAVEN_TARGET)

RC3_TARGET := rc3/script.js
RC3_TEMPLATE := script_snippets/templates/rc3.m4
RC3_DEPS := script_snippets/api/init.m4 \
	script_snippets/api/nav.m4 \
	script_snippets/api/room.m4 \
	script_snippets/util/tips.m4 \
	$(RC3_TEMPLATE)

$(RC3_TARGET) : $(RC3_DEPS)
	$(M4) $(RC3_TEMPLATE) > $(RC3_TARGET)

RELAXATION_TARGET := relaxation/script.js
RELAXATION_TEMPLATE := script_snippets/templates/relaxation.m4
RELAXATION_DEPS := script_snippets/api/init.m4 \
	script_snippets/composite/foreach.m4 \
	script_snippets/api/nav.m4 \
	script_snippets/api/room.m4 \
	script_snippets/api/ui.m4 \
	script_snippets/js/timeout.m4 \
	script_snippets/js/xhr.m4 \
	script_snippets/util/cleanup.m4 \
	script_snippets/util/workplaces.m4 \
	script_snippets/util/tips.m4 \
	$(RELAXATION_TEMPLATE)

$(RELAXATION_TARGET) : $(RELAXATION_DEPS)
	$(M4) $(RELAXATION_TEMPLATE) > $(RELAXATION_TARGET)

WORK_TARGET := work/script.js
WORK_TEMPLATE := script_snippets/templates/work.m4
WORK_DEPS := script_snippets/api/init.m4 \
	script_snippets/api/nav.m4 \
	script_snippets/api/room.m4 \
	script_snippets/api/ui.m4 \
	script_snippets/composite/forloop2.m4 \
	script_snippets/util/bbb.m4 \
	script_snippets/util/workplaces.m4 \
	script_snippets/util/cleanup.m4 \
	script_snippets/util/tips.m4 \
	$(WORK_TEMPLATE)

$(WORK_TARGET) : $(WORK_DEPS)
	$(M4) $(WORK_TEMPLATE) > $(WORK_TARGET)

.PHONY : clean

clean :
	$(RM) $(GIL_TARGET) $(HACKING_TARGET) \
		$(HEAVEN_TARGET) $(RC3_TARGET) \
		$(RELAXATION_TARGET) $(WORK_TARGET)
